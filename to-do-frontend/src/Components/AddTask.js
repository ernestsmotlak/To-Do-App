import React from 'react'
import { useState } from 'react'

const AddTask = (props) => {
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const passedUsername = props.username;
    const passedUuid = props.uuid;

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/addTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: taskName,
                    taskTime: taskTime,
                    taskDate: taskDate,
                    userId: passedUuid,
                    taskUser: passedUsername,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            // Clear input fields after successful submission
            setTaskName('');
            setTaskDate('');
            setTaskTime('');

            console.log('Added -> Taskname: ' + taskName + ' , TaskDate: ' + taskDate + ' , TaskTime: ' + taskTime + ' , UID: ' + passedUuid + ' , Username: ' + passedUsername);
            // Fetch all tasks for the user again.

            props.sendDataToParent(false);

            props.fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error.message);
            props.sendDataToParent(false);
        }
    };


    return (
        <div className='mt-3 pt-2'>
            <h2 className='mt-2'>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder='Task Name' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    <br />
                    <input
                        type={inputTypeDate}
                        placeholder="Date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        onFocus={handleFocusDate}
                        onBlur={handleBlurDate}
                    />
                    <br />
                    <input
                        type={inputTypeTime}
                        placeholder='Time'
                        value={taskTime}
                        onChange={(e) => setTaskTime(e.target.value)}
                        onFocus={handleFocusTime}
                        onBlur={handleBlurTime}
                    />
                </div>
                <i className='bi bi-plus-square-fill mt-2' onClick={handleSubmit}></i>
            </form>
        </div>
    )
}

export default AddTask