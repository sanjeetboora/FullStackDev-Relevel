import React, { useEffect, useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { signIn, signUp } from "../../api/auth";
import { userType } from "../../constants/user";
import {  useNavigate } from "react-router-dom";

function Login(){

    const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [selectedUserType, setSelectedUserType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleSignUp = () => {
        clearAllStates();
        setShowSignUp(!showSignUp);
    }

    const navigate = useNavigate();
    const redirectUrl = () =>{
        if(localStorage.getItem("userStatus") == "approved"){
            if(localStorage.getItem("userType") == userType.customer){
                navigate(-1);
            }
            else if(localStorage.getItem("userType") == userType.admin){
                navigate('/admin');
            }
            else if(localStorage.getItem("userType") == userType.client){
                navigate('/client');
            }
        }else{
            navigate('/noAccessPage');
        } 
    }

    const loginFn = async(event) =>{
        event.preventDefault();

        const data = {
            email, 
            password
        };

        const result = await signIn(data);
        if(result.error){
            setErrorMessage(result.error);
        }else{
            localStorage.setItem("email", result.email);
            localStorage.setItem("name", result.name);
            localStorage.setItem("token", result.token);
            localStorage.setItem("userStatus", result.userStatus);
            localStorage.setItem("userType", result.userType);
            localStorage.setItem("username", result.username);
            localStorage.setItem("bookings", result.bookings);
            redirectUrl();
        }

    }

    const clearAllStates = () =>{
        setEmail('');
        setUsername('');
        setName('');
        setSelectedUserType('');
        setErrorMessage('');
    }

    const signUpFn = async(event) =>{
        event.preventDefault();
        const data = {
            name,
            email, 
            username,
            password,
            userType: selectedUserType
        };
        const result = await signUp(data);
        if(result.error){
            setErrorMessage(result.error);
        }else{
            toggleSignUp();
        }
    }

    const handleSelectUserType = (e) =>{
        setSelectedUserType(e);
    }

    const updateFormData = (e) =>{
        if(e.target.id == "email") {
            setEmail(e.target.value);
        }
        if(e.target.id == "password") {
            setPassword(e.target.value);
        }
        if(e.target.id == "name") {
            setName(e.target.value);
        }
        if(e.target.id == "username") {
            setUsername(e.target.value);
        }
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
                    <span className="text-danger">{errorMessage}</span>
                    <form>
                        <div className="input-group">
                            <input 
                                id="email"
                                name = "email"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={updateFormData}
                                value = {email}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                id="password"
                                name = "password"
                                onChange={updateFormData}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value = {password}
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
                                        value = {name}
                                        onChange={updateFormData}
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
                                        value = {username}
                                        onChange={updateFormData}
                                        autoFocus
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className="mx-1 my-1"> User Type</span>
                                    </div>
                                    <div className="col">
                                        <DropdownButton id="dropdown-basic-button" title="User Type" onSelect={handleSelectUserType}>
                                            <Dropdown.Item eventKey={userType.customer}>{userType.customer}</Dropdown.Item>
                                            <Dropdown.Item eventKey={userType.client}>{userType.client}</Dropdown.Item>
                                            <Dropdown.Item eventKey={userType.admin}>{userType.admin}</Dropdown.Item>
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
                                onClick={showSignUp ? signUpFn : loginFn}
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
