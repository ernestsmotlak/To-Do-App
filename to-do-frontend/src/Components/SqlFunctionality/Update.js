import React from 'react';
import { useState } from 'react';

const Update = (props) => {
    const passedUuid = props.uuid;
    const passedUsername = props.username;
    const passedTask = props.taskName;
    const passedTime = props.taskTime;
    const passedDate = props.taskDate;
    const [newTaskName, setnewTaskName] = useState('');
    const [newTaskTime, setnewTaskTime] = useState('');
    const [newTaskDate, setnewTaskDate] = useState('');
    return (
        <div>
            <h2>Update</h2>
            <div>
                <form>
                    <div>
                        <label>TaskName:</label>
                        <input type='text' value={newTaskName} onChange={(e) => setnewTaskName(e.target.value)}></input>
                    </div>
                    <div>
                        <label>TaskTime:</label>
                        <input type='text' value={newTaskTime} onChange={(e) => setnewTaskTime(e.target.value)}></input>
                    </div>
                    <div>
                        <label>TaskDate:</label>
                        <input type='text' value={newTaskDate} onChange={(e) => setnewTaskDate(e.target.value)}></input>
                    </div>
                    <button type='submit'>Update!</button>
                </form>
            </div>
        </div>
    )
}

export default Update