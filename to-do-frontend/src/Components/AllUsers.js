import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [usernameArray, setUsernameArray] = useState([]);

    const showUsers = async () => {

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

            const newArray = [];
            for (let i = 0; i < data.length; i++) {
                newArray.push(data[i].UserName);
            }

            console.log("New array: " + newArray);
            setUsernameArray(newArray);
            // console.log(usernameArray);

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        showUsers();
    }, []);

    useEffect(() => {
        console.log('Usernamearray: ' + usernameArray);
    }, [usernameArray]);

    return (
        <div>
            AllUsers
            <br />
            <br />

            {error && <p>Error: {error}</p>}

            {<ul>
                {usernameArray.map((username, index) => (
                    <li key={index}>{username}</li>
                ))}
            </ul>}

        </div>
    )
}

export default AllUsers;
