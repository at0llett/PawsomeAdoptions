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
 *  /favorites:
 *    get:
 *      summary: Retrieve all rows from favorites table
 *      description: Use this endpoint to retrieve all rows from favorites table
 *      responses:
 *        '200':
 *          description: A list of all rows from favorites table
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          description: ID of animal
 *                      name:
 *                          type: string
 *                          description: Name of animal
 *                      type:
 *                          type: string
 *                          description: Type of animal
 *                      gender:
 *                          type: string
 *                          description: Gender of animal
 *                      age:
 *                          type: string
 *                          description: Age of animal
 *                      size:
 *                          type: string
 *                          description: Size of animal
 *                      image:
 *                          type: string
 *                          description: Image of animal
 *        '500': 
 *              description: Failed to fetch data
 */
router.get('/', (req, res) => {

    let query = 'SELECT * FROM favorites';
    
    // let query = 'SELECT * FROM books';

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
 * /favorites:
 *   post:
 *     summary: Add a new favorite animal
 *     description: Use this endpoint to add a new favorite to the favorites table
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of animal
 *               name:
 *                 type: string
 *                 description: Name of animal
 *               type:
 *                 type: string
 *                 description: Type of animal
 *               gender:
 *                 type: string
 *                 description: Gender of animal
 *               age:
 *                 type: integer
 *                 description: Age of animal
 *               size:
 *                 type: string
 *                 description: Size of animal
 *               image:
 *                 type: string
 *                 description: Image of animal
 *     responses:
 *       '200':
 *         description: Data inserted successfully
 *       '500':
 *         description: Failed to insert data
 */
router.post('/', (req, res) => {

    const { id, name, type, gender, age, size, image } = req.body;

    var insertData = [id, name, type, gender, age, size, image];
    var insert = "INSERT OR IGNORE INTO favorites (id, name, type, gender, age, size, image) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.serialize(() => {
        db.run(insert, insertData, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            res.setHeader('favPost', id);
            res.status(200).json({ message: 'Data inserted successfully' });
        });
    });
});


/**
 * @swagger
 * /favorites:
 *   delete:
 *     summary: Delete a favorite record
 *     description: Delete a favorite record from the database based on the provided ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the record to delete.
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *       500:
 *         description: Failed to delete data
 */
router.delete('/', (req, res) => {

    db.serialize(() => {
        db.run('DELETE FROM favorites WHERE id = ?', req.body.id, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete data' });
            }
            res.setHeader('deleteFav', req.body.id);
            res.status(200).json({ message: 'Data deleted successfully' });
        });
    });

});

module.exports = router;