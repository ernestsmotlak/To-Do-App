import React from 'react'

const DeleteButton = (props) => {
    const passedUuid = props.uuid;
    const passedUsername = props.username;
    const passedTask = props.taskName;

    return (
        <button>
            {passedTask}
        </button>
    )
}

export default DeleteButton