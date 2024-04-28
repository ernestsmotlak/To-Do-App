import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoApp from './LogoToDoApp.svg';
import './LoginForm.css';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState(null); // State variable to hold login status
  const [uniqueUserId, setUniqueUserId] = useState(null);
  const navigate = useNavigate();

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
      // setUsername('');
      setPassword('');
      setError('');

      // Handle successful login response
      const data = await response.json();
      setLoginStatus(data.loginSuccessful);
      setUniqueUserId(data.UniqueUserID);

    } catch (error) {
      setError(error.message);
      setLoginStatus(error.loginSuccessful); // Set login status to false on error
    }
  };

  useEffect(() => {
    if (loginStatus && uniqueUserId) {
      navigateToUser();
      // console.log('ID from UseEffect: ' + uniqueUserId);
    }
  }, [loginStatus, uniqueUserId]);

  const navigateToUser = () => {
    navigate(`/username/${uniqueUserId}`);
  };

  return (
    <div>
      {/* <h2 className='mt-3 mb-3'>To-Do-App</h2> */}
      <img className='mt-5 mb-3' src={logoApp} style={{ width: '200px', height: 'auto' }} alt='nevem ki se je zgubla'></img>


      <form className='container login-form' onSubmit={handleSubmit}>
        <div className='row justify-content-center'>
          <label className='form-label mt-2'>Username:</label>
          <input className='form-control-lg w-75 mb-3 login-form' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='row justify-content-center'>
          <label className='form-label'>Password:</label>
          <input className='form-control-lg w-75 login-form' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button
          className='login-form-button mt-3 mb-3'
          type="submit"
        >
          Login
        </button>
      </form>

      {loginStatus !== null && (
        <div>
          {loginStatus ? (
            <div><br />
              Successful login!
            </div>
          ) : (
            <p>Unsuccessful login!</p>
          )}
        </div>
      )}

    </div>
  );
};
export default LoginForm;
