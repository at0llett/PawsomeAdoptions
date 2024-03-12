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
 *  /quotes:
 *  get:
 *    summary: Retrieve one random quote from the database
 *    description: Use this endpoint to retrieve one random quote
 *    responses:
 *       '200':
 *         description: A single random quote object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the quote
 *                 quote:
 *                   type: string
 *                   description: The quote text
 *                 author:
 *                   type: string
 *                   description: The author of the quote
 *       '500':
 *          description: Failed to fetch data    
 */
router.get('/', (req, res) => {

    //let query = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";

    let query = 'SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1';

    

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
 *  /quotes:
 *  post:
 *    summary: Insert a new quote into the database
 *    description: Use this endpoint to insert a new quote into the database.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              quote:
 *                type: string
 *                description: The text of the quote to be inserted.
 *              author:
 *                type: string
 *                description: The author of the quote.
 *    responses:
 *       '200':
 *         description: Successfully inserted quote.
 *       '500':
 *         description: Failed to insert quote.
 */
router.post('/', (req, res) => {

    const { quote, author } = req.body;

    var insertData = [quote, author];
    var insert = "INSERT OR IGNORE INTO quotes (quote, author) VALUES (?, ?)";

    db.serialize(() => {
        db.run(insert, insertData, function (err) {
            if (err) {
                //console.error(err.message);
                res.status(500).json({ error: 'Failed to insert quote.' })
                return;
            }
            res.setHeader('newQuote', quote);
            res.status(200).json({ message: 'Successfully inserted quote.' });
        });
    });
});

module.exports = router;