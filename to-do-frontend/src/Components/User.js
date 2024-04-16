import React, { useState } from 'react';
import { useEffect } from 'react';
import AddTask from './AddTask';
import DeleteButton from './SqlFunctionality/DeleteButton'
import Update from './SqlFunctionality/Update'
import './User.css';
import Header from './Header';

const User = () => {
    const [error, setError] = useState('');
    const [tasks, setTasks] = useState(null);
    const [fetchedUuid, setFetchedUuID] = useState('');
    const [username, setUsername] = useState('');
    const [selectedTask, setselectedTask] = useState(null);

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

    const handleUpdateClick = (task) => {
        // If the clicked button corresponds to the currently selected task, hide the Update component
        if (selectedTask === task) {
            setselectedTask(null);
        } else {
            // Otherwise, show the Update component for the clicked task
            setselectedTask(task);
        }
    };

    return (
        <div className='container'>
            <Header className='custom-header' />
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {tasks && (
                <div className='row justify-content-center'>
                    <div className='task'>
                        {tasks.map((task, index) => (
                            <div key={index}>
                                {/* <div className='bg-danger-subtle'>Task: {task.TaskName}</div>
                            <div className='bg-info-subtle'>Time: {task.TaskTime}</div>
                            <div className='bg-warning-subtle'>Date: {task.TaskDate}</div> */}

                                <div className='container mb-3 no-padding-right'>
                                    {/* border border-primary border-2 rounded-2 */}
                                    {/* Here is the problem bg-black */}
                                    <div className='row max-height60'>
                                        <div className='col-9  d-flex justify-content-center align-items-center'>
                                            {task.TaskName.length > 46 ? task.TaskName.substring(0, 46) + '...' : task.TaskName}
                                        </div>
                                        <div className='col-3 no-padding'>
                                            <div className=''>{task.TaskTime}</div>
                                            <div className=''>{task.TaskDate.slice(5)}</div>
                                        </div>
                                    </div>

                                </div>

                                <DeleteButton
                                    username={username}
                                    uuid={fetchedUuid}
                                    fetchTasks={fetchTasks}
                                    taskName={task.TaskName}
                                    taskTime={task.TaskTime}
                                    taskDate={task.TaskDate}
                                />
                                <button className='mb-3 ms-1 btn btn btn-secondary' onClick={() => handleUpdateClick(task)}>Update!</button>

                                {selectedTask === task &&
                                    (<Update
                                        uuid={fetchedUuid}
                                        username={username}
                                        fetchTasks={fetchTasks}
                                        taskName={task.TaskName}
                                        taskTime={task.TaskTime}
                                        taskDate={task.TaskDate}
                                    />)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <AddTask username={username} uuid={fetchedUuid} fetchTasks={fetchTasks} />

        </div>
    );
};

export default User;
