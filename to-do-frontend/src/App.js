import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import User from './Components/User';
import TestFetch from './Components/TestFetch';
import UserSite from './Components/UserSite';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/user' element={<UserSite />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
