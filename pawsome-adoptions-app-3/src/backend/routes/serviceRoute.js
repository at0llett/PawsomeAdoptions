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
            res.status(200).json(row);
        }
    });
})

module.exports = router;