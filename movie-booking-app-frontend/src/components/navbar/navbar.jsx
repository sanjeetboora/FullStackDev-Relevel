import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { isUserLoggedIn } from "../../utils/authUtils";
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function Navbar(props){
    const isLoggedIn = isUserLoggedIn();
    const [searchMovie, onSearchMovieChange] = useState("");
    const navigate = useNavigate();
    const onAuthButtonClick = () =>{
        if(isLoggedIn){
            //logout
            localStorage.clear();
        }
        navigate('/login');
    }
    const onInputChange = (e) =>{
        onSearchMovieChange(e.target.value);
        props.filterMovies(e.target.value);
    }

    return(
        <nav className="navbar navbar-dark bg-dark align-items-center justify-content-between">
            <div><a className="navbar-brand text-danger py-1 ml-2">MBA</a></div>
            <div><Form.Control placeholder="Search Movie Name" size="lg" input={searchMovie} onChange={onInputChange}/></div>
            {isLoggedIn && <div><Button className="btn bg-danger px-5 py-2 mr-2 text-light" onClick= {()=> navigate('/bookings')} type="submit">Show Bookings</Button></div>}
            <div><Button className="btn bg-danger px-5 py-2 mr-2 text-light" onClick= {onAuthButtonClick} type="submit">{isLoggedIn? "Logout" : "Login"} </Button></div>
        </nav>
    );
}

export default Navbar;
