import React from 'react'
import { useState } from 'react'

const AddTask = (props) => {
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const passedUsername = props.username;
    const passedUuid = props.uuid;

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
            props.fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };


    return (
        <div>
            <h2>AddTask</h2>
            Passed username: {passedUsername}
            <br />
            Passed uuid: {passedUuid}
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Task Name: </label>
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    <label>Task Date: </label>
                    <input type="text" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
                    <label>Task Time: </label>
                    <input type="text" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} />
                </div>
                <button type="submit">Save task to db.</button>
            </form>
        </div>
    )
}

export default AddTask