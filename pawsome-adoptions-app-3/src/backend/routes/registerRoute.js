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
    const { username, password, email } = req.body;

    db.serialize(() => {
        // db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,email TEXT)');
        db.run('INSERT INTO User (username,password, email) VALUES (?,?,?)', [username, password, email]);
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

module.exports = router;