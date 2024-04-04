import React, { useState } from 'react';
import { useEffect } from 'react';
import AddTask from './AddTask';
import DeleteTask from './SqlFunctionality/DeleteTask';
import Update from './SqlFunctionality/Update';
import DeleteButton from './SqlFunctionality/DeleteButton'

const User = () => {
    const [error, setError] = useState('');
    const [tasks, setTasks] = useState(null);
    const [fetchedUuid, setFetchedUuID] = useState('');
    const [username, setUsername] = useState('');

    const fetchTasks = () => {
        showUsersTasks();
    };

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
            // setUsername(tasks[0].TaskUser);

        } catch (error) {
            setError(error.message);
        }

    };

    useEffect(() => {
        // Update the username state when tasks state changes
        if (tasks && tasks.length > 0) {
            setUsername(tasks[0].TaskUser);
        }
    }, [tasks]);

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
                    TaskUser: {username}
                    <p>Tasks for {fetchedUuid}:</p>
                    {tasks.map((task, index) => (
                        <div key={index}>
                            Task Name: {task.TaskName}, Task Time: {task.TaskTime}, Task Date: {task.TaskDate}, Task User: {task.TaskUser}
                            <DeleteButton
                                username={username}
                                uuid={fetchedUuid}
                                fetchTasks={fetchTasks}
                                taskName={task.TaskName}
                                taskTime={task.TaskTime}
                                taskDate={task.TaskDate}
                            />
                        </div>
                    ))}
                </div>
            )}

            <AddTask username={username} uuid={fetchedUuid} fetchTasks={fetchTasks} />
            {/* <DeleteTask username={username} uuid={fetchedUuid} fetchTasks={fetchTasks} /> */}
            {/* <Update username={username} uuid={fetchedUuid} fetchTasks={fetchTasks} /> */}

        </div>
    );
};

export default User;
