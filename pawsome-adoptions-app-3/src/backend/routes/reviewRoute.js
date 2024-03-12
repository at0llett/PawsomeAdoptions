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
 * /reviews:
 *   get:
 *     summary: Retrieve all reviews from the database.
 *     description: Retrieve all reviews from the `reviews` table in the database.
 *     responses:
 *       '200':
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   comment:
 *                     type: string
 *                   animal:
 *                     type: string
 *                   rating:
 *                     type: integer
 *                   status:
 *                     type: string
 *       '500':
 *         description: Failed to fetch data.
 */
router.get('/', (req, res) => {

    let query = 'SELECT * FROM reviews';

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
 * /reviews:
 *   post:
 *     summary: Create a new review.
 *     description: Insert a new review into the reviews table.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               comment:
 *                 type: string
 *               animal:
 *                 type: string
 *               rating:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully inserted data.
 *       '500':
 *         description: Failed to insert data.
 */
router.post('/', (req, res) => {

    const { name, comment, animal, rating, status} = req.body;

    var insert = [name, comment, animal, rating, status];
    var insertTemp = "INSERT INTO reviews (name, comment, animal, rating, status) VALUES (?, ?, ?, ?, ?)";

    db.serialize(() => {

        db.run(insertTemp, insert, function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to insert data' });
                return;
            }
            res.setHeader('newStory', name);
            res.status(200).json({ error: 'Successfully inserted data' });
        });

    });

})

/**
 * @swagger
 * /reviews:
 *   delete:
 *     summary: Delete a review by ID.
 *     description: Delete a review from the database by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Deleted from database!
 *       '500':
 *         description: Failed to delete from database
 */
router.delete('/', (req, res) => {

    let id = req.body.id;

    let queryD = `DELETE FROM reviews WHERE id='` + id + "'";
    //let queryS = `SELECT * FROM reviews`;


    db.serialize(() => {
        db.run(queryD, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete from database' });
            }
            res.setHeader('delStory', id);
            // Deletion successful
            res.status(200).json({ message: 'Deleted from database!' });
        });
    })
});



module.exports = router;