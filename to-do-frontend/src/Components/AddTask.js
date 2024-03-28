import React from 'react'
import { useState } from 'react'

const AddTask = () => {
    const [taskName, settaskName] = useState('');
    const [taskDate, settaskDate] = useState('');
    const [taskTime, settaskTime] = useState('');

    const clogFormData = (event) => {
        event.preventDefault();
        console.log('TaskName: ' + taskName + '\n' + 'TaskDate: ' + taskDate + '\n' + 'TaskTime: ' + taskTime + '\n');
    }

    return (
        <div>
            <br />
            <br />
            <br />
            AddTask
            <br />
            <br />
            <form onSubmit={clogFormData}>
                <div>
                    <label>Task Name: </label>
                    <input type="text" value={taskName} onChange={(e) => settaskName(e.target.value)} />
                    <label>Task Date: </label>
                    <input type="text" value={taskDate} onChange={(e) => settaskDate(e.target.value)} />
                    <label>Task Time: </label>
                    <input type="text" value={taskTime} onChange={(e) => settaskTime(e.target.value)} />
                </div>
                <button type="submit">Show Tasks</button>
            </form>
        </div>
    )
}

export default AddTask