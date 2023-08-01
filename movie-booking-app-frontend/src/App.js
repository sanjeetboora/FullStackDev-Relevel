import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/auth';
import LandingPage from './pages/landingPage/landingPage';
import Admin from './pages/admin/admin';
import Client from './pages/client/client';
import MovieDetails from './pages/movieDetails/movieDetails';
import BookingsPage from './pages/bookingsPage/bookingsPage';
import TheatresDetails from './pages/theatresDetails/theatresDetails';
import Booking from './pages/bookings/booking';

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
          <Route 
              element={ <div>Sorry!! Unauthorized</div> }
              path="/noAccessPage"
          />
          <Route 
              element={ <MovieDetails />}
              path="/movieDetails/:movieId"
          />
          <Route 
              element={ <TheatresDetails />}
              path="movieDetails/:movieId/theatres"
          />
          <Route 
              element={ <Booking />}
              path="/:showroomId/booking"
          />
          <Route 
              element={ <BookingsPage />}
              path="/bookings"
          />
        </Routes>
      </Router>
    );
}

export default App;
