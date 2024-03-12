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

/**
 * @swagger
 * /trivia:
 *   get:
 *     summary: Get random trivia questions.
 *     description: Retrieve random trivia questions from the database.
 *     responses:
 *       '200':
 *         description: A list of random trivia questions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   question:
 *                     type: string
 *                    choice1:
 *                     type: string
 *                    choice2:
 *                     type: string
 *                    choice3:
 *                     type: string
 *                    choice4:
 *                     type: string
 *                   answer:
 *                     type: string
 *       '500':
 *         description: Failed to fetch data
 */
router.get('/', (req, res) => {

    let query = 'SELECT * FROM trivia ORDER BY RANDOM() LIMIT 5';

    

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(rows);
        }
    });

})


/**
 * @swagger
 * /trivia:
 *   post:
 *     summary: Insert a new trivia question.
 *     description: Insert a new trivia question into the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               choice1:
 *                 type: string
 *               choice2:
 *                 type: string
 *               choice3:
 *                 type: string
 *               choice4:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully inserted question.
 *       '500':
 *         description: Failed to insert question.
 */
router.post('/', (req, res) => {

    const { question, choice1, choice2, choice3, choice4, answer } = req.body;

    var insertData = [question, choice1, choice2, choice3, choice4, answer];
    var insert = "INSERT OR IGNORE INTO trivia (question, choice1, choice2, choice3, choice4, answer) VALUES (?, ?, ?, ?, ?, ?)";

    db.serialize(() => {
        db.run(insert, insertData, function (err) {
            if (err) {
                //console.error(err.message);
                res.status(500).json({ error: 'Failed to insert question.' })
                return;
            }
            res.setHeader('newQuestion', question);
            res.status(200).json({ message: 'Successfully inserted question.' });
        });
    });
});




module.exports = router;