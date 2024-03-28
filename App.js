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

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
