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
    const [addTaskButtonClicked, setaddTaskButtonClicked] = useState(false);

    const [desktopView, setdesktopView] = useState(window.outerWidth > 650);

    function isTaskButtonClicked(buttonClicked) {
        setaddTaskButtonClicked(buttonClicked);
    };

    const fetchTasks = () => {
        showUsersTasks();
    };

    const fetchUuid = () => {
        const url = window.location.href;
        const uuidIndex = url.lastIndexOf('/') + 1;
        const uuid = url.substring(uuidIndex);
        setFetchedUuID(uuid);
    };


    useEffect(() => {
        fetchUuid();
    }, [fetchUuid]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        setdesktopView(window.outerWidth > 650);
    };

    // handleResize and its' useEffect cause the desktopView state to re render upon resizing the screen.

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

    // const setTaskNameLength = (task) => {
    //     if (window.outerWidth > 1838) {
    //         setshowTaskName(task.TaskName.substring(0, 145) + '...');
    //     } else if (window.outerWidth) {
    //         setshowTaskName(task.TaskName.substring(0, 142) + '...');
    //     } else if (window.outerWidth < 1572) {
    //         setshowTaskName(task.TaskName.substring(0, 125) + '...');
    //     }
    //     else if (window.outerWidth < 1350) {
    //         setshowTaskName(task.TaskName.substring(0, 104) + '...');
    //     }
    //     else if (window.outerWidth < 1036) {
    //         setshowTaskName(task.TaskName.substring(0, 75) + '...');
    //     }
    // };

    return (
        <div>
            {desktopView ? (
                <div className='container'>
                    <Header className='custom-header' sendToUser={isTaskButtonClicked} />
                    LOCAL
                    {error && <div style={{ color: 'red' }}>{error}</div>}

                    {addTaskButtonClicked ?
                        (<AddTask username={username} uuid={fetchedUuid} fetchTasks={fetchTasks} sendDataToParent={isTaskButtonClicked} />) : (null)}


                    {tasks && (
                        <div className='row justify-content-center desktop'>
                            <div className='task'>
                                {tasks.map((task, index) => (
                                    <div key={index}>
                                        {/* <div className='bg-danger-subtle'>Task: {task.TaskName}</div>
                        <div className='bg-info-subtle'>Time: {task.TaskTime}</div>
                        <div className='bg-warning-subtle'>Date: {task.TaskDate}</div> */}

                                        <div className='container mb-2 no-padding-right'>
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
                                        <i>&nbsp;</i>
                                        <i className='update-button bi bi-arrow-clockwise' onClick={() => handleUpdateClick(task)}></i>
                                        {selectedTask === task &&
                                            (<Update
                                                uuid={fetchedUuid}
                                                username={username}
                                                fetchTasks={fetchTasks}
                                                taskName={task.TaskName}
                                                taskTime={task.TaskTime}
                                                taskDate={task.TaskDate}
                                            />)}

                                        <hr className='dashed' />
                                        {/* Hr styles in User.css */}

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='container'>
                    Less than 650px
                    <Header className='custom-header' sendToUser={isTaskButtonClicked} />
                    {error && <div style={{ color: 'red' }}>{error}</div>}

                    {addTaskButtonClicked ?
                        (<AddTask username={username} uuid={fetchedUuid} fetchTasks={fetchTasks} sendDataToParent={isTaskButtonClicked} />) : (null)}


                    {tasks && (
                        <div className='row justify-content-center'>
                            <div className='task'>
                                {tasks.map((task, index) => (
                                    <div key={index}>
                                        {/* <div className='bg-danger-subtle'>Task: {task.TaskName}</div>
                        <div className='bg-info-subtle'>Time: {task.TaskTime}</div>
                        <div className='bg-warning-subtle'>Date: {task.TaskDate}</div> */}

                                        <div className='container mb-2 no-padding-right'>
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
                                        <i>&nbsp;</i>
                                        <i className='update-button bi bi-arrow-clockwise' onClick={() => handleUpdateClick(task)}></i>
                                        {selectedTask === task &&
                                            (<Update
                                                uuid={fetchedUuid}
                                                username={username}
                                                fetchTasks={fetchTasks}
                                                taskName={task.TaskName}
                                                taskTime={task.TaskTime}
                                                taskDate={task.TaskDate}
                                            />)}

                                        <hr className='dashed' />
                                        {/* Hr styles in User.css */}

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )
            }

        </div >
    );
};

export default User;
