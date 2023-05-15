import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { Suspense } from 'react';
import Login from './pages/Login';
import Engineer from './pages/Engineer';
import Customer from './pages/Customer';
import Admin from './pages/Admin';

function App() {
  return(
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback = {<div className='loader'></div>}>
              <Login />
            </Suspense>
          }
          />
        <Route
          exact
          path="/customer"
          element={
            <Suspense fallback = {<div className='loader'></div>}>
              <Customer />
            </Suspense>
          }
          />
        <Route
          exact
          path="/admin"
          element={
            <Suspense fallback = {<div className='loader'></div>}>
              <Admin />
            </Suspense>
          }
          />
        <Route
          exact
          path="/engineer"
          element={
            <Suspense fallback = {<div className='loader'></div>}>
              <Engineer />
            </Suspense>
          }
          />
      </Routes>
    </Router>
  )
}

export default App;
