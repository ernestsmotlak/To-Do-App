import React, { useState } from 'react';
import { useEffect } from 'react';

const User = () => {
    const [error, setError] = useState('');
    const [tasks, setTasks] = useState(null);
    const [username, setUsername] = useState('');
    const [fetchedUuid, setFetchedUuID] = useState('');

    const fetchUuid = () => {
        var temp = window.location.href;
        temp = temp.replace('http://localhost:3001/username/', '');
        setFetchedUuID(temp);
    };

    useEffect(() => {
        fetchUuid();
    }, []);

    console.log("Fetched uuid: " + fetchedUuid);

    const showUsersTasks = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/userTasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fetchedUuid }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setTasks(data.tasks);
            console.log(data.tasks);  // here brt, here
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div>
            <h2>User: </h2> {username}
            <form onSubmit={showUsersTasks}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <button type="submit">Show Tasks</button>
            </form>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {tasks && (
                <div>
                    <p>Tasks for {username}:</p>
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                Task ID: {task.TaskId}, Task Name: {task.TaskName}, Task Time: {task.TaskTime}, Task Date: {task.TaskDate}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            Here:
            {fetchedUuid}
        </div>
    );
};

export default User;
