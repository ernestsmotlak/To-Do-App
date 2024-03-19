import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    const showUsers = async () => {
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
            <br />

            {error && <p>Error: {error}</p>}

            {<ul>
                {usernameArray.map((index) => (
                    <li key={index}>{usernameArray[index]}</li>
                ))}
            </ul>}

        </div>
    )
}

export default AllUsers;
