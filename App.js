const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

app.use(cors()); // Use cors middleware to enable CORS

// Connect to SQLite database
const db = new sqlite3.Database('sqlDataBase/Baza.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.use(bodyParser.json());

// app.post('/register', (req, res) => {
//     const {username, password} = req.body;

//     const sql = ''
// });


// Route to handle user authentication (login)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database to find the user with the provided username and password
    const sql = 'SELECT UniqueUserID FROM User WHERE username = ? AND password = ?';
    db.get(sql, [username, password], (err, user) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: 'Internal server error', loginSuccessful: false });
        }

        // If user does not exist, return error
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password', loginSuccessful: false });
        }

        // If user exists and password matches, send success response
        res.json({ message: 'Login successful', loginSuccessful: true, UniqueUserID: user.UniqueUserID });
    });
});

app.post('/api/addTask', (req, res) => {
    const { taskName, taskTime, taskDate, userId, taskUser } = req.body;

    if (!taskDate || !taskName || !taskTime || !userId || !taskUser) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = 'INSERT INTO Task (TaskName, TaskTime, TaskDate, TaskUniqueUserID, TaskUser) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [taskName, taskTime, taskDate, userId, taskUser], function (err) {
        if (err) {
            console.error('Erorr executing query: ', err.message);
            return err.status(500).json({ error: 'Internal server error.' });
        }

        res.json({ message: 'Task added successfully.' });
    })
});

app.post('/api/deleteTask', (req, res) => {
    const { taskName, userUniqueID } = req.body;

    if (!taskName) {
        return res.status(400).json({ error: 'Task name is required!' });
    }

    if (!userUniqueID) {
        return res.status(400).json({ error: '' });
    }

    const sql = 'DELETE FROM Task WHERE TaskName = ? AND TaskUniqueUserID = ?';
    db.run(sql, [taskName, UniqueUserID], function (err) {
        if (err) {
            console.error('Error executing the query', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'No task found.' });
        }

        res.json({ message: 'Successfully deleted from database.' });
    });


});

// Define other routes for fetching data
app.get('/api/users', (req, res) => {
    // Execute SQL query to fetch data from the 'User' table
    const sql = 'SELECT * FROM User;'; // Adjust the query as per your table structure
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Send fetched data as a JSON response
        res.json(rows);
    });
});

app.get('/api/usernames', (req, res) => {
    // Execute SQL query to fetch data from the 'User' table
    const sql = 'SELECT Username FROM User;'; // Adjust the query as per your table structure
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Send fetched data as a JSON response
        res.json(rows);
    });
});

app.get('/api/tasks', (req, res) => {
    // Execute SQL query to fetch data from the 'Task' table
    const sql = 'SELECT * FROM Task;'; // Adjust the query as per your table structure
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Send fetched data as a JSON response
        res.json(rows);
    });
});

app.get('/api/uuid', (req, res) => {
    // Execute SQL query to fetch data from the 'Task' table
    const sql = 'SELECT UniqueUserID FROM User;'; // Adjust the query as per your table structure
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Send fetched data as a JSON response
        res.json(rows);
    });
});

app.post('/api/userTasks', (req, res) => {
    const { uuid } = req.body;

    const sql = 'SELECT * FROM Task WHERE TaskUniqueUserID = ?';
    db.all(sql, [uuid], (err, tasks) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!tasks.length) {
            return res.status(401).json({ error: 'No tasks found for the user' });
        }

        res.json({ message: 'Tasks found', tasks });
    });
});

app.post('/api/zbrisiTask', (req, res) => {
    const { taskName, uuid, username, taskTime, taskDate } = req.body;

    if (!taskName) {
        return res.status(400).json({ error: 'Task name is required!' });
    }

    if (!uuid) {
        return res.status(400).json({ error: 'User unique ID is required!' });
    }

    if (!username) {
        return res.status(400).json({ error: 'Username is required!' });
    }

    if (!taskTime) {
        return res.status(400).json({ error: 'TaskTime is required!' });
    }

    if (!taskDate) {
        return res.status(400).json({ error: 'TaskDate is required!' });
    }


    const sql = 'DELETE FROM Task WHERE TaskName = ? AND TaskUniqueUserID = ? AND TaskUser = ? AND TaskTime = ? AND TaskDate = ?';

    db.run(sql, [taskName, uuid, username, taskTime, taskDate], function (err) {
        if (err) {
            console.error('Error making query.', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (this.changes === 0) {
            return res.status(400).json({ error: 'No task found!' });
        }

        res.json({ message: 'Successfully deleted from db!' });

    });

});

app.post('api/username', (req, res) => {
    const { uuid } = req.body;

    const sql = 'SELECT UserName FROM User WHERE UserName = ?';
    db.all(sql, [uuid], (err, username) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (!username.length) {
            return res.status(401).json({ error: 'No users with that uuid found!' });
        }

        res.json({ message: 'Username found', username });
    });
});

app.post('/api/updateTask', (req, res) => {
    const { taskName, uuid, taskUser, newTaskName, newTaskTime, newTaskDate } = req.body;

    if (!uuid || !taskUser || !taskName || !newTaskName || !newTaskTime || !newTaskDate) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const sql = 'UPDATE Task SET TaskName = ?, TaskTime = ?, TaskDate = ? WHERE TaskName = ? AND TaskUniqueUserID = ? AND TaskUser = ?';

    db.run(sql, [newTaskName, newTaskTime, newTaskDate, taskName, uuid, taskUser], function (err) {
        if (err) {
            console.error('Error updating task!', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'No task found!' });
        }

        res.json({ message: 'Task updated successfully!' });

    })
});

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
