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
            Task Time:
            <br />
            {/* <form onSubmit={}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="text" value={} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form> */}

            <br />
            <form>
                <div>
                    <label>Task Date:</label>
                    <input type="text" />
                </div>
                <button >Login</button>
            </form>

        </div>
    )
}

export default Update