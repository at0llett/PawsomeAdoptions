var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var cors = require('cors');
var router = express.Router();

router.use(express.json());
router.use(cors());

// const db = new sqlite3.Database('src/backend/mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log('Connected to the SQLite database.');
//     }
// });

router.get('/favorites', (req, res) => {

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

router.post('/favorites', (req, res) => {

    const { id, name, type, gender, age, size, image } = req.body;

    var insertData = [id, name, type, gender, age, size, image];
    var insert = "INSERT OR IGNORE INTO favorites (id, name, type, gender, age, size, image) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.serialize(() => {
        db.run(insert, insertData);
    });
});

router.delete('/favorites', (req, res) => {

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

module.exports = router;