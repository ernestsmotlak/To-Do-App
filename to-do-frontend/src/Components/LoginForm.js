import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
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

  return (
    <div>
      <h2>Login</h2>

      {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
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
    </div>
  );
}

export default LoginForm;
