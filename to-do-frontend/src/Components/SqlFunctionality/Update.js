import React from 'react'

const Update = (props) => {
    const username = props.username;
    const uuid = props.uuid;


    return (
        <div>
            <h2>Update</h2>
            Select which you want to update:
            <br />
            <form>
                <div>
                    <label>Task Name:</label>
                    <input type="text" />
                </div>
                <button >Login</button>
            </form>
        </div>
    )
}

export default Update