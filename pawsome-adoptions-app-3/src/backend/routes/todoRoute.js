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