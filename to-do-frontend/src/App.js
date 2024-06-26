import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import { useEffect, useState } from 'react';
import NotFound from './Components/NotFound';
import User from './Components/User';

function App() {
  const [uuidArray, setUuidArray] = useState([]);

  useEffect(() => {
    const fetchAllUserIDs = async () => {
      try {
        const response = await fetch('http://84.247.184.37:3000/api/uuid');

        if (!response.ok) {
          throw new Error('Failed to fetch usernames.');
        }

        const data = await response.json();
        const newArray = data.map(user => user.UniqueUserID);
        setUuidArray(newArray);
        //console.log('New Array: ' + newArray);

      } catch (error) {
        console.log(error);
      }
    };


    fetchAllUserIDs();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginForm uniqueIdArray={uuidArray} />} />
          <Route path='*' element={<NotFound />}></Route>
          {uuidArray.map((uniqueUserID, index) => (
            <Route key={index} path={`username/${uniqueUserID}`} element={<User />} />
          ))}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
