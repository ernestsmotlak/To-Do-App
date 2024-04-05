import React from 'react';
import {useState} from 'react';

const Update = (props) => {
    const passedUuid = props.uuid;
    const passedUsername = props.username;
    const passedTask = props.taskName;
    const passedTime = props.taskTime;
    const passedDate = props.taskDate;

    const [newUsername, setNewUsername] = useState('');
    const [newTaskName, setnewTaskName] = useState('');
    return (
        <div>
            <h2>Update</h2>
            <div>
                <form>
                    <div>
                        <label>TaskName:</label>
                        <input type='text' value={newUsername} onChange={(e) => setNewUsername(e.target.value)}></input>

                    </div>
                    <div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update