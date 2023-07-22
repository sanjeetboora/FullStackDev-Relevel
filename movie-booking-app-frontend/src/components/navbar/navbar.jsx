import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { isUserLoggedIn } from "../../utils/authUtils";
import Form from 'react-bootstrap/Form';

function Navbar(){
    const isLoggedIn = isUserLoggedIn();
    const navigate = useNavigate();
    const onAuthButtonClick = () =>{
        if(isLoggedIn){
            //logout
            localStorage.clear();
        }
        navigate('/login');
    }
    return(
        <nav className="navbar navbar-dark bg-dark align-items-center justify-content-between">
            <div><a className="navbar-brand text-danger py-1 ml-2">MBA</a></div>
            <div><Form.Control placeholder="Search Movie Name" size="lg"/></div>
            <div><Button className="btn bg-danger px-5 py-2 mr-2 text-light" onClick= {onAuthButtonClick} type="submit">{isLoggedIn? "Logout" : "Login"} </Button></div>
        </nav>
    );
}

export default Navbar;
