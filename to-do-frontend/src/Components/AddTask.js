import React from 'react'
import { useState } from 'react'

const AddTask = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');

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
                    taskDate: taskDate,
                    taskTime: taskTime,
                    userId: 'user_id_here', // Replace with the actual user ID
                }),
            });


            // Clear input fields after successful submission
            setTaskName('');
            setTaskDate('');
            setTaskTime('');

            console.log('Task added successfully');
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };


    return (
        <div>
            <br />
            <br />
            <br />
            AddTask
            <br />
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
                <button type="submit">Show Tasks</button>
            </form>
        </div>
    )
}

export default AddTask