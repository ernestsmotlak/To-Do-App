import React, { useEffect, useState } from 'react';
import Child from './Child';

const AllUsers = () => {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    const showUsers = async (event) => {
        // event.preventDefault();
        let usernameArray = [];

        try {
            const response = await fetch('http://localhost:3000/api/usernames', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error);
            }

            const data = await response.json();
            setUsers(data);
            // console.log("Data: ", data);

            for (let i = 0; i < data.length; i++) {
                usernameArray.push(data[i].UserName);
            }

            console.log(usernameArray);

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        showUsers();
    }, []);

    return (
        <div>
            AllUsers
            <br />
            Fetch all users. <br />
            Save into a const. <br />
            Return to App.js (Parent)

            {/* <button onClick={showUsers}>Get Users</button> */}

            <br />
            <br />
            {users.length > 0 && (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.UserName}</li>
                    ))}
                </ul>
            )}
            {error && <p>Error: {error}</p>}
            <Child />
        </div>
    )
}

export default AllUsers;
