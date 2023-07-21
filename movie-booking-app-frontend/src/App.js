import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/auth';
import LandingPage from './pages/landingPage/landingPage';

function App() {
    return(
      <Router>
        <Routes>
        <Route 
              element={ <LandingPage /> }
              path="/"
          />
          <Route 
              element={ <Login /> }
              path="/login"
          />
        </Routes>
      </Router>
    );
}

export default App;
