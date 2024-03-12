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
 *     summary: Create a new user
 *     description: Create a new user with the provided username, password, email, and name.
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Failed to fetch data
 */
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
            res.status(200).json(rows); // Send rows as JSON response
        }
    });
    
});


/**
 * @swagger
 * /register:
 *   get:
 *     summary: Get all usernames and emails
 *     description: Retrieve usernames and emails of all users from the database.
 *     responses:
 *       200:
 *         description: An array of user objects containing usernames and emails
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Failed to fetch data
 */
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