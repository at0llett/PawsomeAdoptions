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

router.post('/', (req, res) => {
    const { username, password, email, name } = req.body;

    db.serialize(() => {
        db.run('INSERT INTO User (username, password, email, name) VALUES (?,?,?,?)', [username, password, email, name]);
    });

    db.all('SELECT * FROM User', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.json(rows); // Send rows as JSON response
        }
    });
    
});

// get all users' usernames and emails
router.get('/', (req, res) => {

    let query = 'SELECT username, email FROM User ';
    
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.status(200).json(rows);
        }
    });
});

module.exports = router;