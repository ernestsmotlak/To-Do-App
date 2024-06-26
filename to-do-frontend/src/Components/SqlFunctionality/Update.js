import React from 'react';
import { useState } from 'react';
const Update = (props) => {
    const passedUsername = props.username;
    const passedUuid = props.uuid;
    const passedTask = props.taskName;
    const passedTime = props.taskTime;
    const passedDate = props.taskDate;
    const [newTaskName, setnewTaskName] = useState('');
    const [newTaskTime, setnewTaskTime] = useState('');
    const [newTaskDate, setnewTaskDate] = useState('');

    const sumbitUpdateTask = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://84.247.184.37:3000/api/updateTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: passedTask,
                    uuid: passedUuid,
                    taskUser: passedUsername,
                    newTaskName: newTaskName !== '' ? newTaskName : passedTask,
                    newTaskTime: newTaskTime !== '' ? newTaskTime : passedTime,
                    newTaskDate: newTaskDate !== '' ? newTaskDate : passedDate,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            console.log('Successfully updated the task ');
            props.fetchTasks();

        } catch (error) {
            console.error('Error updating task!', error.message);
        }
    };

    const [inputTypeDate, setInputTypeDate] = useState('text');
    const [inputTypeTime, setinputTypeTime] = useState('text');

    const handleFocusDate = () => {
        setInputTypeDate('date');
    };

    const handleFocusTime = () => {
        setinputTypeTime('time');
    };

    const handleBlurDate = () => {
        setInputTypeDate('text');
    };
    const handleBlurTime = () => {
        setinputTypeTime('text');
    };


    return (
        <div className='update-task mt-2'>
            <h2 className='mt-3 update-header'>Update Task</h2>
            <div>
                <form>
                    <div>
                        <input className='task-name' type='text'
                            placeholder={passedTask}
                            value={newTaskName}
                            onChange={(e) => {
                                const tempTaskName = e.target.value;
                                setnewTaskName(tempTaskName !== '' ? tempTaskName : passedTask);
                            }}
                        ></input>
                    </div>
                    <div>
                        <input
                            className='task-time'
                            type={inputTypeTime}
                            placeholder='Time'
                            value={newTaskTime}
                            onChange={(e) => {
                                const tempTaskTime = e.target.value;
                                setnewTaskTime(tempTaskTime !== '' ? tempTaskTime : passedTime);
                            }}
                            onFocus={handleFocusTime}
                            onBlur={handleBlurTime}
                        ></input>
                    </div>
                    <div>
                        <input
                        className='task-date'
                            type={inputTypeDate}
                            placeholder='Date'
                            value={newTaskDate}
                            onChange={(e) => {
                                const tempTaskDate = e.target.value;
                                setnewTaskDate(tempTaskDate !== '' ? tempTaskDate : passedDate);
                            }}
                            onFocus={handleFocusDate}
                            onBlur={handleBlurDate}
                        ></input>
                    </div>
                    <i className='mt-3 bi bi-check-square-fill' type='submit' onClick={sumbitUpdateTask}></i>
                </form>
            </div>
        </div>
    )
}

export default Update