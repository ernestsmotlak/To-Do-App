import React, { useState, useEffect } from 'react';

const UserSite = () => {
    const [username, setUsername] = useState('');
    const [tasks, setTasks] = useState(null);
    const [error, setError] = useState('');

    const userTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/userTasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error);
            }

            const data = await response.json();
            setTasks(data.tasks);

        } catch (error) {
            setError(error.message);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        userTasks();
    };

    return (
        <div>
            <h2>UserSite</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <button type="submit">Show Tasks</button>
            </form>

            <br />

            {error && <div>{error}</div>}
            {tasks && tasks.length === 0 && <div>No tasks found for the user</div>}
            {tasks && tasks.length > 0 && (
                <div>
                    {tasks.map((task, index) => (
                        <div key={index}>
                            Task ID: {task.TaskId}, Task Name: {task.TaskName}, Task Time: {task.TaskTime}, Task Date: {task.TaskDate}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserSite;
