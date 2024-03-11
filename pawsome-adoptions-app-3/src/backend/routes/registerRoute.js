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

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Insert a new user into the database.
 *     description: Insert a new user record into the User table.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User inserted successfully.
 *       '500':
 *         description: Failed to insert user.
 */
router.post('/', (req, res) => {
    const { username, password, email } = req.body;

    db.serialize(() => {
        // db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,email TEXT)');
        db.run('INSERT INTO User (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err) => {
            if (err) {
                //console.error('Failed to insert user:', err.message);
                return res.status(500).json({ error: 'Failed to insert user' });
            }
            //console.log('User inserted successfully');
            // You can return a success message or any other data you need
            res.setHeader('newRegistration', username);
            return res.status(200).json({ message: 'User inserted successfully' });
        });
    });
    
    
});

module.exports = router;