import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/auth';
import LandingPage from './pages/landingPage/landingPage';
import Admin from './pages/admin/admin';
import Client from './pages/client/client';

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
          <Route 
              element={ <Admin /> }
              path="/admin"
          />
          <Route 
              element={ <Client /> }
              path="/client"
          />
        </Routes>
      </Router>
    );
}

export default App;
