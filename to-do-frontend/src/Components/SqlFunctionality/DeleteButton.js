import React from 'react'

const DeleteButton = (props) => {
    const passedUuid = props.uuid;
    const passedUsername = props.username;
    const passedTask = props.taskName;
    const passedTime = props.taskTime;
    const passedDate = props.taskDate;

    const submitDeleteTask = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/zbrisiTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: passedTask,
                    uuid: passedUuid,
                    username: passedUsername,
                    taskTime: passedTime,
                    taskDate: passedDate,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            console.log('Succesfully deleted the task: ' + passedTask + ' and uuid: ' + passedUuid);
            props.fetchTasks();

        } catch (error) {
            console.error('Erorr deleting task.', error.message);
        }
    };

    return (
        <button onClick={submitDeleteTask}>
            Delete!
            {/* {passedTask} */}
        </button>
    )
}

export default DeleteButton