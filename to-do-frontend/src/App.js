import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import UserSite from './Components/UserSite';
import { useEffect, useState } from 'react';

function App() {
  const [usernameArray, setUsernameArray] = useState([]);

  useEffect(() => {
    const fetchAllUsernames = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/usernames');

        if (!response.ok) {
          throw new Error('Failed to fetch usernames.');
        }

        const data = await response.json();
        const newArray = data.map(user => user.UserName);
        setUsernameArray(newArray);
        console.log('New Array: ' + newArray);

      } catch (error) {
        console.log(error);
      }
    };


    fetchAllUsernames();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginForm userArray={usernameArray}/>} />
          {/* <Route path='/loginform' element={<LoginForm />} />
          <Route path='/user' element={<UserSite />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
