import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Login(){

    const [showSignUp, setShowSignUp] = useState(false);
    const toggleSignUp = () => {
        setShowSignUp(!showSignUp);
    }

    return (
    <div>
        <div id="loginPage">
            <div id="loginPage" className="bg-danger d-flex justify-content-center align-items-center vh-100" >
                <div className="card m-5 p-5 ">
                    <div className="row m-2 ">
                    </div>
                    <h4 className="text-center ">
                        {showSignUp ? "Sign up" : "Login"}
                    </h4>
                    <form>
                        <div className="input-group">
                            <input 
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                autoFocus
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                autoFocus
                                required
                            />
                        </div>
                        {showSignUp  && 
                            <>
                                <div className="input-group">
                                    <input 
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        autoFocus
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <input 
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        autoFocus
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className="mx-1 my-1"> User Type</span>
                                    </div>
                                    <div className="col">
                                        <DropdownButton id="dropdown-basic-button" title="User Type">
                                            <Dropdown.Item href="#/action-1">CUSTOMER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">CLIENT</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">ADMIN</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="input-group">
                            <input 
                                id="submit"
                                type="submit"
                                className="form-control btn btn-danger"
                                value = {showSignUp ? "Sign up" : "Login"}
                            />
                        </div>
                        <div className="text-centre" onClick={toggleSignUp}>
                            { showSignUp?
                                "Already have an account? Login" :
                                "Don't have an account? Sign up"
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div style={{ position: "fixed", left: 0, bottom: 0, right: 0, backgroundColor: "white", }} >
            <footer className="page-footer">
                <div className="text-center py-3">
                    © 2023 Copyright:
                    <a href="https://relevel.com">Relevel by Unacademy</a>
                </div>
            </footer>
        </div> 
    </div>
    );
}


export default Login;
