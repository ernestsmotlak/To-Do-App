import React, { useState } from 'react';
import { useEffect } from 'react';
import AddTask from './AddTask';

const User = () => {
    const [error, setError] = useState('');
    const [tasks, setTasks] = useState(null);
    const [username, setUsername] = useState('');
    const [fetchedUuid, setFetchedUuID] = useState('');

    const fetchUuid = () => {
        var temp = window.location.href;
        setFetchedUuID(temp.replace('http://localhost:3006/username/', ''));
    };

    useEffect(() => {
        fetchUuid();
    }, [fetchUuid]);

    useEffect(() => {
        if (fetchedUuid !== '') {
            showUsersTasks();
        }
    }, [fetchedUuid]);


    const showUsersTasks = async (event) => {
        if (event) {
            event.preventDefault(); // Prevent default form submission behavior if event is provided
        }

        try {
            const response = await fetch('http://localhost:3000/api/userTasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uuid: fetchedUuid }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setTasks(data.tasks);

        } catch (error) {
            setError(error.message);
        }

    };


    return (
        <div>
            <h2>User: </h2>
            {/* <form onSubmit={showUsersTasks}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <button type="submit">Show Tasks</button>
            </form> */}

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {tasks && (
                <div>
                    <p>Tasks for {fetchedUuid}:</p>
                    {tasks.map((task, index) => (
                        <div key={index}>
                            Task Name: {task.TaskName}, Task Time: {task.TaskTime}, Task Date: {task.TaskDate}, Task User: {task.TaskUser}
                        </div>
                    ))}
                </div>
            )}

            <AddTask />
        </div>
    );
};

export default User;
