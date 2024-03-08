var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var cors = require('cors');
var router = express.Router();

const mysql = require('mysql');

router.use(express.json());
router.use(cors());

const connection = mysql.createConnection({
    host: '35.230.114.73', 
    user: 'root',   
    password: 'kRh98VMFkbMD', 
    database: 'pawsome_db' 
});

connection.connect((err) => {
    if (err) {
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
});







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
 */
router.get('/quotes', (req, res) => {

    //let query = "SELECT * FROM quotes ORDER BY RAND() LIMIT 1";

    let query = 'SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1';

    // connection.query(query, (err, rows) => {
    //     if (err) {
    //         console.error(err.message);
    //         res.status(500).json({ error: 'Failed to fetch data' });
    //     } else {
    //         res.status(200).json(rows[0]); // Assuming rows is an array of objects, return the first (and only) row
    //     }
    // });

    // db.all(query, (err, rows) => {
    //     if (err) {
    //         console.error(err.message);
    //         res.status(500).json({ error: 'Failed to fetch data' });
    //     } else {
    //         res.status(200).json(rows);
    //     }
    // });

})

// router.post('/quotes', (req, res) => {

//     const { quote, author } = req.body;

//     var insertData = [quote, author];
//     var insert = "INSERT OR IGNORE INTO quotes (quote, author) VALUES (?, ?)";

//     db.serialize(() => {
//         db.run(insert, insertData, function (err) {
//             if (err) {
//                 //console.error(err.message);
//                 res.status(500).json({ error: 'Failed to insert quote.' })
//                 return;
//             }
//             res.status(200).json({ message: 'Successfully inserted quote.' });
//         });
//     });
// });



connection.end((err) => {
    if (err) {
        console.error('Error closing database connection:', err);
        return;
    }
    console.log('Disconnected from database');
});


module.exports = router;