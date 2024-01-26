const sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database("adoptions.db", sqlite3.OPEN_READWRITE);

const db = new sqlite3.Database('adoptions.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const tableCreation = "CREATE TABLE IF NOT EXISTS Animals (AnimalID INTEGER, AnimalType TEXT, AnimalName TEXT, AnimalGender TEXT, AnimalColor TEXT," +
"AnimalBreed TEXT, AnimalAge TEXT, AnimalWeight TEXT, PRIMARY KEY(AnimalID))"

db.run(tableCreation, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Users table created successfully.');
    }
  });


var insertData1 = [123, "Dog", "Roxie", "Girl", "Blue", "Tabby", "4 years", "10lb"];
var insertData2 = [124, "Cat", "Symi", "Girl", "Black", "", "15 years", "5lb"];
var insertData3 = [125, "Cat", "Tupac", "Boy", "Brown", "Tabby", "11 years", "11lb"];
var insert =  'INSERT OR IGNORE INTO Animals (AnimalID, AnimalType, AnimalName, AnimalGender, AnimalColor, AnimalBreed, AnimalAge, AnimalWeight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
db.run(insert, insertData1);
db.run(insert, insertData2);
db.run(insert, insertData3);


db.serialize(() => {
    db.all('SELECT * FROM Animals', [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            // Process the rows returned by the query
            rows.forEach((row) => {
                console.log(row);
            });
        }
    });
});





db.close();