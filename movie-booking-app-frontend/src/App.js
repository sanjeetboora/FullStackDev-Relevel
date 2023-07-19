import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/auth';

function App() {
    return(
      <Router>
        <Routes>
          <Route 
              element={ <Login /> }
              path="/login"
          />
        </Routes>
      </Router>
    );
}

export default App;
