import React, { useEffect, useState } from 'react';
import './LoginForm.css';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState(null); // State variable to hold login status

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginStatus(errorData.loginSuccessful);
        throw new Error(errorData.error);
      }

      console.log(username);
      // Reset form fields and error message
      setUsername('');
      setPassword('');
      setError('');

      // Handle successful login response
      const data = await response.json();
      setLoginStatus(data.loginSuccessful); // Set login status

    } catch (error) {
      setError(error.message);
      setLoginStatus(error.loginSuccessful); // Set login status to false on error
    }
  };

  const findUsername = (arr, username) => {
    if (arr.includes(username)) {
      return "true";
    } else {
      return "false";
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>

      {loginStatus !== null && (
        <div>
          {loginStatus ? (
            <div><br /> Go to user!
              <p>Login successful</p>
            </div>
          ) : (
            <p>Unsuccessful login!</p>
          )}
        </div>
      )}

Here: 
      < br/>
      {findUsername(props.userArray, username)}

      {/* {props.userArray && (
        <ul >
          {props.userArray.map((username, index) => (
            <li key={index}>Username: {username}</li>
          ))}
        </ul>
      ) } */}

    </div>
  );
};
export default LoginForm;
