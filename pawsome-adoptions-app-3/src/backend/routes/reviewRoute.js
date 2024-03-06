var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var cors = require('cors');
var router = express.Router();

router.use(express.json());
router.use(cors());

const db = new sqlite3.Database('src/backend/mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

router.get('/', (req, res) => {

    let query = 'SELECT * FROM reviews';
    
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

router.post('/', (req, res) => {

    const { name, comment, animal, rating, status} = req.body;

    var insert = [name, comment, animal, rating, status];
    var insertTemp = "INSERT INTO reviews (name, comment, animal, rating, status) VALUES (?, ?, ?, ?, ?)";

    db.serialize(() => {

        db.run(insertTemp, insert, function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to insert data' });
                return;
            }
        });



        let query = "SELECT * FROM reviews";

        db.all(query, (err, rev) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to fetch data' });
            } else {
                res.status(200).json(rev);
            }
        });

    });

})

router.delete('/', (req, res) => {

    let id = req.body.id;

    let queryD = `DELETE FROM reviews WHERE id='` + id + "'";
    let queryS = `SELECT * FROM reviews`;


    db.serialize(() => {
        db.run(queryD, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete from database' });
            }
    
            // Deletion successful
            //res.json({ message: 'Deleted from database!' });
        });

        db.all(queryS, (err, rev) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to fetch data' });
            } else {
                res.status(200).json(rev);
            }
            //console.log(rev);
        });
    })
});



module.exports = router;