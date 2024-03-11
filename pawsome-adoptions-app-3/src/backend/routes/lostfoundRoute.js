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
 * /lostfound:
 *   get:
 *     summary: Retrieve all records from lostfound table
 *     description: Retrieve all records from the lostfound table in the database.
 *     responses:
 *       200:
 *         description: An array of lostfound records.
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
 *                   status:
 *                     type: string
 *                   type:
 *                     type: string
 *                   animal:
 *                     type: string
 *                   description:
 *                     type: string
 *                   contact:
 *                     type: string
 *       500:
 *         description: Failed to fetch data
 */
router.get('/', (req, res) => {

    let query = 'SELECT * FROM lostfound';

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
 * /lostfound:
 *   post:
 *     summary: Insert a new record into the lostfound table
 *     description: Insert a new record into the lostfound table in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               animal:
 *                 type: string
 *               status:
 *                 type: string
 *               type:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully inserted the record.
 *       500:
 *         description: Failed to insert quote.
 */
router.post('/', (req, res) => {

    const { name, description, animal, status, type, contact } = req.body;

    var insertData = [name, description, animal, status, type, contact];

    var insert = "INSERT INTO lostfound (name, description, animal, status, type, contact) VALUES (?, ?, ?, ?, ?, ?)";

    db.serialize(() => {
        db.run(insert, insertData, function (err) {
            if (err) {
                //console.error(err.message);
                res.status(500).json({ error: 'Failed to insert quote.' })
                return;
            }
            res.setHeader('postLost', name);
            res.status(200).json({ message: 'Successfully inserted quote.' });
            return;
        });
    });
});

/**
 * @swagger
 * /lostfound:
 *   delete:
 *     summary: Delete a record from lostfound table and associated comments from lfcomments table
 *     description: Delete a record from the lostfound table with the specified id. Also, delete any associated comments from the lfcomments table.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The id of the record to be deleted
 *           example:
 *             id: 1
 *     responses:
 *       200:
 *         description: Successfully deleted.
 *       500:
 *         description: Failed to delete from database
 */
router.delete('/', (req, res) => {

    //REMOVE FROM lfcomments

    let id = req.body.id;

    let queryD = `DELETE FROM lostfound WHERE id='` + id + "'";
    let queryC = `DELETE FROM lfcomments WHERE id='` + id + "'";
    //let queryS = `SELECT * FROM lostfound`;

    db.serialize(() => {
        db.run(queryD, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete from database' });
            }
    
            db.run(queryC, (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Failed to delete from database' });
                }

                res.setHeader('delLost', id);
                res.status(200).json({ message: 'Successfully deleted.' });
                // db.all(queryS, (err, rows) => {
                //     if (err) {
                //         console.error(err.message);
                //         res.status(500).json({ error: 'Failed to fetch data' });
                //     } else {
                //         res.status(200).json(rows);
                //     }
                //     //console.log(rev);
                // });
            });
        });
    });
});

/**
 * @swagger
 * /lostfound:
 *   put:
 *     summary: Update the status of a record in the lostfound table
 *     description: Update the status of a record in the lostfound table with the specified id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The id of the record to be updated
 *               status:
 *                 type: string
 *                 description: The new status value for the record
 *           example:
 *             id: 1
 *             status: Found
 *     responses:
 *       200:
 *         description: Updated succesfully.
 *       500:
 *         description: Failed to update data
 */
router.put('/', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    db.serialize(() => {
        db.run(`UPDATE lostfound SET status = ? WHERE id = ?`, [status, id], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to update data' });
                //return;
            }
            res.setHeader('updateLost', id);
            res.status(200).json({message: 'Updated succesfully.'});
            //console.log(`Row with id ${isbn} updated successfully`);
        });
    });
})

/**
 * @swagger
 * /lostfound/comments/{id}:
 *   get:
 *     summary: Retrieve comments associated with a record from the lfcomments table
 *     description: Retrieve all comments associated with a record from the lfcomments table based on the specified id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the record for which comments are to be retrieved
 *     responses:
 *       200:
 *         description: An array of comments associated with the record
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comment_id:
 *                     type: integer
 *                     description: Unique value for each comment
 *                   id:
 *                     type: string
 *                     description: Corresponding ID
 *                   comment:
 *                     type: string
 *       500:
 *         description: Failed to fetch data
 */
router.get('/comments/:id', (req, res) => {

    let query = `SELECT * FROM lfcomments WHERE id='` + req.params.id + `'`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.setHeader('getCom', req.params.id);
            res.status(200).json(rows);
        }
    });

})

/**
 * @swagger
 * /lostfound/comments:
 *   post:
 *     summary: Add a comment to the lostfound item
 *     description: Add a new comment to the lostfound item identified by the provided id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The id of the lostfound item to which the comment belongs.
 *               comment:
 *                 type: string
 *                 description: The comment to be added.
 *     responses:
 *       200:
 *         description: Successfully inserted comment.
 *       500:
 *         description: Failed to insert comment.
 */
router.post('/comments', (req, res) => {

    const { comment, id } = req.body;

    var insertData = [id, comment];

    var insert = "INSERT INTO lfcomments (id, comment) VALUES (?, ?)";

    db.serialize(() => {
        db.run(insert, insertData, function (err) {
            if (err) {
                //console.error(err.message);
                res.status(500).json({ error: 'Failed to insert comment.' })
                return;
            }
            res.setHeader('newCom', id);
            res.status(200).json({ message: 'Successfully inserted comment.' });
        });
    });
});

/**
 * @swagger
 * /lostfound/comments:
 *   delete:
 *     summary: Delete a comment from the lostfound item
 *     description: Delete a comment from the lostfound item identified by the provided comment_id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_id:
 *                 type: integer
 *                 description: The id of the comment to be deleted.
 *     responses:
 *       200:
 *         description: Deleted from database!
 *       500:
 *         description: Failed to delete from database
 */
router.delete('/comments', (req, res) => {

    let id = req.body.comment_id;

    let queryD = `DELETE FROM lfcomments WHERE comment_id='` + id + "'";

    db.serialize(() => {
        db.run(queryD, (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete from database' });
            }
            res.setHeader('delCom', id);
            res.json({ message: 'Deleted from database!' });
        });
    })
});

module.exports = router;