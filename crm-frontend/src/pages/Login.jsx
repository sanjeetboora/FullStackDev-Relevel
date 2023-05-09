import '../styles/Login.css';
import React, {useState} from "react";
import {DropdownButton, Dropdown} from 'react-bootstrap'


function Login(){
    const [showSignUpPage, setShowSignUpPage] = useState(false);

    const toggleSignUp = () =>{
        setShowSignUpPage(!showSignUpPage);
        console.log(showSignUpPage)
    }

    const loginFn = (event) =>{
        const userEmail = event.getElementById("email");
        const userPassword = event.getElementById("password");
        const userData = {userEmail, userPassword}
        event.preventDefault();
        console.log(userData);
    }

    const handleSelect = (val) =>{
        console.log(val);
    }

    return (
        <div className="loginPageContainer">
            { 
                showSignUpPage ? (
                    <div id='signUpPage' className='container container-sm'>
                        <div className='display-5 signup-text'>Sign Up</div>
                        <form>
                            <div className="mb-3">
                                <label for="name">Name</label>
                                <input type="text" className="form-control" name="Name" id="name" placeholder='Enter your name'/>
                            </div>
                            <div className="mb-3">
                                <label for="email">Email Address</label>
                                <input type="email" className="form-control" name="Email" id="email" placeholder='Enter your email' />
                            </div>
                            <div className="mb-3">
                                <label for="password">Password</label>
                                <input type="text" className="form-control" name="Password" id="password" placeholder='Enter password' />
                            </div>
                            <div className="mb-3">
                                <label for="userType">User Type</label>
                                <DropdownButton id="userType" align="end" title="UserType" onSelect={handleSelect} variant='dark' className="mb-2">
                                    <Dropdown.Item active = "true" eventKey = "customer">Customer</Dropdown.Item>
                                    <Dropdown.Item eventKey = "engineer">Engineer</Dropdown.Item>
                                    <Dropdown.Item eventKey = "admin">Admin</Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                            <div onClick={toggleSignUp}> Already have an account? Sign In</div>
                        </form>
                    </div> 
                )
                    : 
                (
                    <div className="loginPage">
                        <div className='signin-text'>Sign In</div>
                        <form onSubmit={loginFn}>
                            <input type="email" id = "email" placeholder="Enter email address" className="input-email"/>
                            <br />
                            <input type="password" id = "password" placeholder="Enter password" className='input-password'/>
                            <br />
                            <input type="submit" value="SIGN IN" className='signin-button'/>
                            <div onClick={toggleSignUp}> Don't have an account? Sign Up</div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Login;


