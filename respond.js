// FORM HANDLING



var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var fs = require('fs');
//var bodyParser = require('body-parser');
var cors = require('cors');
const { json } = require('body-parser');
var app = express();
const port = 3000;

app.use(cors());

//const { type } = require('os');

const middle = express.urlencoded({
    extended: true,
    limit: 10000,
    parameterLimit: 10
});


//app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static('public'));

const db = new sqlite3.Database('Data/adoptions.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.post('/upload', middle, (req, res) => {
    const type = req.body.type;
    

    console.log(type);

    //res.send('Form submitted successfully!');

    db.serialize(() => {
        //console.log('SELECT * FROM Animals WHERE AnimalType=' + type);
        db.all('SELECT * FROM Animals WHERE AnimalType = ?', [type], (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                // Process the rows returned by the query
                rows.forEach((row) => {
                    console.log(row);
                });
            }

            const jsonData = JSON.stringify(rows, null, 2);
    
            fs.writeFile('adopt.json', jsonData, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log('JSON file has been saved.');
                }
            });  

            res.json(rows);

        });
    });
    
 


});







app.listen(port, ()=> {
    console.log(`Server is running at http://localhost:${port}`);
});