// Makai Martinez
// TCSS 460
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

// get all tasks/ first backend test
// Later on refine to only get tasks for specified user.
// router.get('/', (req, res) => {
//     let query = 'SELECT * FROM Task ';
//     db.all(query, (err, rows) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).json({ error: 'Failed to fetch data' });
//         } else {
//             res.status(200).json(rows);
//         }
//     });
// });

// get all data for a specific task task by its id.
/**
 * @swagger
 * /todo/{task_id}/{username}:
 *   get:
 *     summary: Get data for task by its id
 *     description: Get all data for a specific task by its id
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         description: ID of the task to retrieve
 *         schema:
 *           type: integer
 *       - in: path
 *         name: username
 *         required: true
 *         description: username associated with the task
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Data for given id
 *         content:content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   due_date:
 *                     type: string
 *                   status:
 *                     type: string
 *       '500':
 *         description: Failed to fetch data
 */
router.get('/:task_id/:username', (req, res) => {

    const task =  req.params.task_id;
    const sqlQuery = 'SELECT * FROM Task WHERE task_id = ?';
    
    db.all(sqlQuery, [task], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.status(200).json(rows);
        }
    });
});


// get all tasks and user info for specified user.
/**
 * @swagger
 * /todo/{username}:
 *   get:
 *     summary: Get tasks and user info for a specific user.
 *     description: Retrieve tasks and info for a specific user by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user whose tasks to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tasks and user info for the specified user.
 *       '500':
 *         description: Failed to fetch data
 */
router.get('/:username', (req, res) => {

    const user =  req.params.username;
    const sqlQuery = 'SELECT * FROM Task INNER JOIN User ON Task.user_id=User.user_id WHERE User.username = ?';
    
    db.all(sqlQuery, [user], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// delete a specified task by task id
/**
 * @swagger
 * /todo:
 *   delete:
 *     summary: Delete a task.
 *     description: Delete a task with the specified task_id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task_id:
 *                 type: integer
 *                 description: The ID of the task to delete.
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who owns the task.
 *     responses:
 *       '200':
 *         description: Output tasks after deletion
 *       '500':
 *         description: Failed to fetch data
 */
router.delete('/', (req, res) => {

    db.serialize(() => {
        db.run('DELETE FROM Task WHERE task_id = ?', req.body.task_id);
    });

    db.all('SELECT * FROM Task WHERE user_id = ?', req.body.user_id, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch data' });
        } else {
            res.json(rows); // Send rows as JSON response
        }
    });
});


// insert a new task into the task table
/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new task.
 *     description: Create a new task with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               due_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Output tasks after insertion
 *       '500':
 *         description: Failed to fetch data
 */
router.post('/', (req, res) => {

    const { title, description, due_date, status, user_id } = req.body;
    var insertData = [title, description, due_date, status, user_id];
    console.log(insertData);

    var insert = "INSERT INTO Task (title, description, due_date, status, user_id) VALUES (?, ?, ?, ?, ?)";

    db.serialize(() => {
        db.run(insert, insertData, function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to insert data' });
                return;
            }
        });

        let query = "SELECT * FROM Task";

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to fetch data' });
            } else {
                res.status(200).json(rows);
            }
        });
    });
});


// update the frontend info for a task (i.e everything except ID #s), title, description, due date, and status
/**
 * @swagger
 * /todo:
 *   put:
 *     summary: Update a task.
 *     description: Update the details of a task with the specified ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               due_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               task_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Updated succesfully.
 *       '500':
 *         description: Failed to update data
 */
router.put('/', (req, res) => {
    const { title, description, due_date, status, task_id} = req.body;

    var updateData = [title, description, due_date, status, task_id];
    var updateQuery = "UPDATE Task SET title = ?, description = ?, due_date = ?, status = ? WHERE task_id = ?";
    
    db.serialize(() => {
        db.run(updateQuery, updateData, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Failed to update data' });
            }
            res.status(200).json({message: 'Updated succesfully.'});
        });
    });
});


module.exports = router;