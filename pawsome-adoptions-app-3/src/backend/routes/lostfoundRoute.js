var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var cors = require('cors');
var router = express.Router();

const mysql = require('mysql');

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

    //let query = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";

    let query = 'SELECT * FROM lostfound';

    

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

    const { name, description, animal, status, type, contact } = req.body;

    var insertData = [name, description, animal, status, type, contact];

    var insert = "INSERT INTO lostfound (name, description, animal, status, type, contact) VALUES (?, ?, ?, ?, ?, ?)";

    // const { quote, author } = req.body;

    // var insertData = [quote, author];
    // var insert = "INSERT OR IGNORE INTO quotes (quote, author) VALUES (?, ?)";

    db.serialize(() => {
        db.run(insert, insertData, function (err) {
            if (err) {
                //console.error(err.message);
                res.status(500).json({ error: 'Failed to insert quote.' })
                return;
            }
            //res.status(200).json({ message: 'Successfully inserted quote.' });
        });
    });

    let query = "SELECT * FROM lostfound";

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to fetch data' });
            } else {
                res.status(200).json(rows);
            }
        });
});

router.delete('/', (req, res) => {

    //REMOVE FROM lfcomments

    let id = req.body.id;

    let queryD = `DELETE FROM lostfound WHERE id='` + id + "'";
    let queryC = `DELETE FROM lfcomments WHERE id='` + id + "'";
    let queryS = `SELECT * FROM lostfound`;

    db.serialize(() => {
        db.run(queryD, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete from database' });
            }
    
            db.run(queryC, (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Failed to delete from database' });
                }

                db.all(queryS, (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        res.status(500).json({ error: 'Failed to fetch data' });
                    } else {
                        res.status(200).json(rows);
                    }
                    //console.log(rev);
                });
            });
        });
    });
});

router.put('/', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    db.serialize(() => {
        db.run(`UPDATE lostfound SET status = ? WHERE id = ?`, [status, id], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to update data' });
                //return;
            }
            res.status(200).json({message: 'Updated succesfully.'});
            //console.log(`Row with id ${isbn} updated successfully`);
        });
    });


})


router.get('/comments/:id', (req, res) => {

    //let query = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";

    let query = `SELECT * FROM lfcomments WHERE id='` + req.params.id + `'`;

    

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.status(200).json(rows);
        }
    });

})

router.post('/comments', (req, res) => {

    const { comment, id } = req.body;

    var insertData = [id, comment];

    var insert = "INSERT INTO lfcomments (id, comment) VALUES (?, ?)";

    // const { quote, author } = req.body;

    // var insertData = [quote, author];
    // var insert = "INSERT OR IGNORE INTO quotes (quote, author) VALUES (?, ?)";

    db.serialize(() => {
        db.run(insert, insertData, function (err) {
            if (err) {
                //console.error(err.message);
                res.status(500).json({ error: 'Failed to insert quote.' })
                return;
            }
            //res.status(200).json({ message: 'Successfully inserted quote.' });
        });
    });

    let query = `SELECT * FROM lfcomments WHERE id='` + id + `'`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to fetch data' });
            } else {
                res.status(200).json(rows);
            }
        });
});

router.delete('/comments', (req, res) => {

    let id = req.body.comment_id;

    let queryD = `DELETE FROM lfcomments WHERE comment_id='` + id + "'";
    let queryS = `SELECT * FROM lfcomments`;


    db.serialize(() => {
        db.run(queryD, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete from database' });
            }
    
            // Deletion successful
            //res.json({ message: 'Deleted from database!' });
        });

        db.all(queryS, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to fetch data' });
            } else {
                res.status(200).json(rows);
            }
            //console.log(rev);
        });
    })
});

module.exports = router;