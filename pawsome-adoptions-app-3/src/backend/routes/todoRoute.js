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
router.get('/', (req, res) => {

    let query = 'SELECT * FROM Task ';
    
    db.all(query, (err, rows) => {
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

    db.all('SELECT * FROM Task', (err, rows) => {
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

    const { title, description, due_date, status, task_id, user_id } = req.body;

    var insertData = [title, description, due_date, status, task_id, user_id];
    var insert = "INSERT INTO Task (title, description, due_date, status, task_id, user_id) VALUES (?, ?, ?, ?, ?, ?)";

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