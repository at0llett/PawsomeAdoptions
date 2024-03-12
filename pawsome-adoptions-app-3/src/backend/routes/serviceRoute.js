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
 * /services/{service}/{zip}:
 *   get:
 *     summary: Get services by service type and ZIP code.
 *     description: Retrieve services based on the service type and ZIP code provided.
 *     parameters:
 *       - in: path
 *         name: service
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of service to filter by. Use all to get all services
 *       - in: path
 *         name: zip
 *         schema:
 *           type: string
 *         required: true
 *         description: The ZIP code to filter by. Use 'All' to get all services in the database.
 *     responses:
 *       '200':
 *         description: A list of services matching the service type and ZIP code.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   service:
 *                     type: string
 *                   description:
 *                     type: string
 *                   link:
 *                     type: string
 *                   zip:
 *                     type: string
 *       '500':
 *         description: Failed to fetch data.
 */
router.get('/:service/:zip', (req, res) => {

    

    const service = req.params.service;
    const zip = req.params.zip;

    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    // console.log("Zip: " + zip);
    // console.log("Service: " + service);


    let query = 'SELECT * FROM services WHERE 1=1';

    if (zip !== "All") {
        query += ` AND zip = '${zip}'`;
    }
    if (service !== "All") {
        query += ` AND service = '${service}'`;
    }

    db.all(query, (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            //console.log(row);
            res.setHeader('service', service);
            res.status(200).json(row);
        }
    });
})

module.exports = router;