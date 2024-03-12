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
 * /login:
 *   get:
 *     summary: Retrieve user information
 *     description: Retrieve email, password, and username information of all users.
 *     responses:
 *       200:
 *         description: An array of user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   username:
 *                     type: string
 *       500:
 *         description: Failed to fetch user data.
 */
router.get('/', (req, res) => {

    let query = 'SELECT email, password, username FROM User ';
    
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