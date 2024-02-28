// "scripts": {
//   "start": "react-scripts start",
//   "build": "react-scripts build",
//   "test": "react-scripts test",
//   "eject": "react-scripts eject"
// },

var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var fs = require('fs');
//var bodyParser = require('body-parser');
var cors = require('cors');
const { json } = require('body-parser');
var app = express();
const port = 3001;
// app.use(express.bodyParser());

app.use(cors());

//const { type } = require('os');

const middle = express.urlencoded({
    extended: true,
    //limit: 10000,
    //parameterLimit: 10
});

app.use(express.json());

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static('public'));

const db = new sqlite3.Database('src/backend/mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// var table = "CREATE TABLE favorites (id TEXT PRIMARY KEY, name TEXT, type TEXT, gender TEXT age TEXT, size TEXT, image TEXT)";
// db.serialize(() => {
//     db.run(table);
// });

// var insert1 = ["My little dog - a heartbeat at my feet.", "Edith Wharton"];
// var insert2 = ["I am fond of pigs. Dogs look up to us. Cats look down on us. Pigs treat us as equals.", "Winston Churchill"];
// var insert3 = ["In ancient times cats were worshipped as gods; they have not forgotten this.", "Terry Pratchett"];
// var insert4 = ["Time spent with cats is never wasted.", "Sigmund Freud"];
// var insert5 = ["A dog is the only thing on earth that loves you more than you love yourself.", "Josh Billings"];
// var insert6 = ["Animals are such agreeable friends. They ask no questions; they pass no criticisms.", "George Eliot"];
// var insert7 = ["I wonder if other dogs think poodles are members of a weird religious cult.", "Rita Rudner"];
// var insert8 = ["I would like to see anyone, prophet, king or God, convince a thousand cats to do the same thing at the same time.", "Neil Gaiman"];
// var insert9 = ["Until one has loved an animal, a part of one's soul remains unawakened.", "Anatole France"];
// var insert10 = ["A cat has aboslute emotional honesty; human beings, for one reason or another, may hide their feelings, but a cat does not.", "Ernest Hemingway"];
// var insert11 = ["One cat just leads to another.", "Ernest Hemingway"];
// var insert12 = ["If man could be crossed with the cat, it would improve man, but it would deteriorate the cat.", "Mark Twain"];
// var insert13 = ["There are two means of refuge from the miseries of life: music and cats.", "Albert Schweitzer"];
// var insert14 = ["To err is human, to purr is feline.", "Robert Byrne"];
// var insert15 = ["People who love cats have some of the biggest hearts around.", "Susan Easterly"];
// var insert16 = ["Every dog must have his day.", "Jonathan Swift"];
// var insert17 = ["Such short little lives our pets have to spend with us, and they spend most of it waiting for us to come home each day.", "John Grogan"];
// var insert18 = ["If there are no dogs in heaven, then when I die, I want to go where they went.", "Will Rogers"];
// var insert19 = ["I think dogs are the most amazing creatures; they give unconditional love for me, they are the role model for being alive.", "Gilda Radner"];
// var insert20 = ["Be the person your dog thinks you are.", "CJ Frick"];
// var insert21 = ["Opening up your life to a dog who needs a home is one of the msot fulfilling things you can do.", "Emma Kenney"];

// var insertTemp = "INSERT INTO quotes (quote, author) VALUES (?, ?)";
// db.serialize(() => {
//     db.run(insertTemp, insert1);
//     db.run(insertTemp, insert2);
//     db.run(insertTemp, insert3);
//     db.run(insertTemp, insert4);
//     db.run(insertTemp, insert5);
//     db.run(insertTemp, insert6);
//     db.run(insertTemp, insert7);
//     db.run(insertTemp, insert8);
//     db.run(insertTemp, insert9);
//     db.run(insertTemp, insert10);
//     db.run(insertTemp, insert11);
//     db.run(insertTemp, insert12);
//     db.run(insertTemp, insert13);
//     db.run(insertTemp, insert14);
//     db.run(insertTemp, insert15);
//     db.run(insertTemp, insert16);
//     db.run(insertTemp, insert17);
//     db.run(insertTemp, insert18);
//     db.run(insertTemp, insert19);
//     db.run(insertTemp, insert20);
//     db.run(insertTemp, insert21);
// });

app.get('/quotes', (req, res) => {

    let query = 'SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1';
    
    // let query = 'SELECT * FROM books';

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.status(200).json(rows);
        }
    });

})

app.post('/quotes', middle, (req, res) => {

    const { quote, author } = req.body;

    var insertData = [quote, author];
    var insert = "INSERT OR IGNORE INTO quotes (quote, author) VALUES (?, ?)";

    db.serialize(() => {
        db.run(insert, insertData);
    });
});

app.get('/favorites', (req, res) => {

    let query = 'SELECT * FROM favorites';
    
    // let query = 'SELECT * FROM books';

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.status(200).json(rows);
        }
    });

})

app.post('/favorites', middle, (req, res) => {

    const { id, name, type, gender, age, size, image } = req.body;

    var insertData = [id, name, type, gender, age, size, image];
    var insert = "INSERT OR IGNORE INTO favorites (id, name, type, gender, age, size, image) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.serialize(() => {
        db.run(insert, insertData);
    });
});

app.delete('/favorites', middle, (req, res) => {

    db.serialize(() => {
        db.run('DELETE FROM favorites WHERE id = ?', req.body.id);
    });

    db.all('SELECT * FROM favorites', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.json(rows); // Send rows as JSON response
        }
    });

});



// app.get('/favorites', (req, res) => {
//     db.all('SELECT * FROM favorites', (err, rows) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).json({ error: 'Failed to fetch data' });
//         } else {
//             res.json(rows); // Send rows as JSON response
//         }
//     });
// });


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});