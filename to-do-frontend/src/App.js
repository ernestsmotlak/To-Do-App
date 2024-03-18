import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import UserSite from './Components/UserSite';
import Child from './Components/PathTest/Child';
import Parent from './Components/PathTest/Parent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path='/child' element={<Child />} />
        <Route path='/parent' element={<Parent />} />
          {/* <Route path='/loginform' element={<LoginForm />} />
          <Route path='/user' element={<UserSite />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
