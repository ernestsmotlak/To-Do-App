import React from 'react'
import { useState } from 'react';

const DeleteTask = (props) => {
    const [taskName, setTaskName] = useState('');
    const passedUsername = props.username;
    const passedUuid = props.uuid;

    const submitDeleteTask = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/zbrisiTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: taskName,
                    uuid: passedUuid,
                    username: passedUsername,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            console.log('Succesfully deleted the task: ' + taskName + ' and uuid: ' + passedUuid);
            props.fetchTasks();

        } catch (error) {
            console.error('Erorr deleting task.', error.message);
        }
    };

    return (
        <div>
            <h2>DeleteTask</h2>
            Uuid: {passedUuid} <br />
            User: {passedUsername} <br />

            <form onSubmit={submitDeleteTask}>
                <div>
                    <label>Task Name: </label>
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <button type="submit">Delete from db.</button>
            </form>

        </div>
    )
}

export default DeleteTask