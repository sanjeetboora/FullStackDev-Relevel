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
            <div class="login-page bg-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 offset-lg-1">
                              <h3 class="mb-3">{showSignUpPage ? "Sign Up" : "Sign In"}</h3>
                                <div class="bg-white shadow rounded">
                                    <div class="row">
                                        <div class="col-md-7 pe-0">
                                            <div class="form-left h-100 py-5 px-5">
                                                { 
                                                    showSignUpPage ? (
                                                            <form onSubmit={loginFn} class="row g-4">
                                                                <div class="col-12">
                                                                    <label>Name<span class="text-danger">*</span></label>
                                                                    <div class="input-group">
                                                                        <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                                                                        <input type="text" className="form-control" name="Name" id="name" placeholder='Enter your name'/>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12">
                                                                    <label>Email<span class="text-danger">*</span></label>
                                                                    <div class="input-group">
                                                                        <div class="input-group-text"><i class="bi bi-envelope-fill"></i></div>
                                                                        <input type="email" className="form-control" name="Email" id="email" placeholder='Enter your email' />
                                                                    </div>
                                                                </div>

                                                                <div class="col-12">
                                                                    <label>Password<span class="text-danger">*</span></label>
                                                                    <div class="input-group">
                                                                        <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                                                                        <input type="password" className="form-control" name="Password" id="password" placeholder='Enter password' />  
                                                                    </div>
                                                                </div>

                                                                <div class="col-12">
                                                                    <label>User Type<span class="text-danger">*</span></label>
                                                                    <div class="input-group">
                                                                        <DropdownButton id="userType" align="end" title="UserType" onSelect={handleSelect} variant='light' className="mb-2">
                                                                            <Dropdown.Item active = "true" eventKey = "customer">Customer</Dropdown.Item>
                                                                            <Dropdown.Item eventKey = "engineer">Engineer</Dropdown.Item>
                                                                            <Dropdown.Item eventKey = "admin">Admin</Dropdown.Item>
                                                                        </DropdownButton>  
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="col-sm-8">
                                                                    <div onClick={toggleSignUp} class="float-end text-primary">Already have an account? Sign In</div>
                                                                </div>

                                                                <div class="col-12">
                                                                    <button type="submit" class="btn btn-primary px-4 float-end mt-4">Sign Up</button>
                                                                </div>
                                                        </form>
                                                    
                                                    )
                                                        : 
                                                    (

                                                        <form onSubmit={loginFn} class="row g-4">
                                                                <div class="col-12">
                                                                    <label>Email Address<span class="text-danger">*</span></label>
                                                                    <div class="input-group">
                                                                        <div class="input-group-text"><i class="bi bi-envelope-fill"></i></div>
                                                                        <input type="email" id = "email" placeholder="Enter email address" className="form-control"/>
                                                                    </div>
                                                                </div>

                                                                <div class="col-12">
                                                                    <label>Password<span class="text-danger">*</span></label>
                                                                    <div class="input-group">
                                                                        <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                                                                        <input type="password" id = "password" placeholder="Enter password" className='form-control'/>
                                                                    </div>
                                                                </div>

                                                                <div class="col-sm-8">
                                                                    <div onClick={toggleSignUp} class="float-end text-primary">Don't have an account? Sign Up</div>
                                                                </div>

                                                                <div class="col-12">
                                                                    <button type="submit" class="btn btn-primary px-4 float-end mt-4">Sign In</button>
                                                                </div>
                                                        </form>
                                                                            
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div class="col-md-5 ps-0 d-none d-md-block">
                                            <div class="form-right h-100 bg-primary text-white text-center pt-5">
                                                <i class="bi bi-bootstrap"></i>
                                                <h2 class="fs-1"> {showSignUpPage ? "Welcome!!!" : "Welcome Back!!!"} </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       
    )
}

export default Login;


