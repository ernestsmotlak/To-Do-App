import React from 'react'

const Update = (props) => {
    const passedUuid = props.uuid;
    const passedUsername = props.username;
    const passedTask = props.taskName;
    const passedTime = props.taskTime;
    const passedDate = props.taskDate;

    

    return (
        <button>
            Update
        </button>
    )
}

export default Update