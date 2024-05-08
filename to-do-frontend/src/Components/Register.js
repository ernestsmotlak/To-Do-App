import React from 'react'
import logoApp from './LogoToDoApp.svg';
import { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, password2 }),
            });

            if(!response.ok) {
                const errorData = await response.json();
                setRegistered(errorData.registerationSuccessful);
                // set it to false from backend
                throw new Error(errorData.error);
            }

            const data = await response.json();
            
            setRegistered(data.registrationSuccessful);
            // set it to true from backend
            console.log(data);

        }

        catch (error) {
            setError(error.message);
        }

    };

    return (
        <div>
            <h2 className='mt-2'></h2>
            <img className='mt-5 mb-3' src={logoApp} style={{ width: '200px', height: 'auto' }} alt='nevem ki se je zgubla'></img>

            <form className='container login-form' >
                {/* onSubmit={handleSubmit} */}
                Local Register
                <div className='row justify-content-center'>
                    <label className='form-label mt-2'>Enter the username:</label>
                    <input className='form-control-lg w-75 mb-3 login-form' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='row justify-content-center'>
                    <label className='form-label'>Enter the password:</label>
                    <input className='form-control-lg w-75 login-form' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='row justify-content-center mt-3'>
                    <label className='form-label'>Enter the password again:</label>
                    <input className='form-control-lg w-75 login-form' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <button
                    className='login-form-button mt-3 mb-3'

                >
                    Sign Up / Register
                </button>
            </form>

        </div>
    )
}

export default Register