import '../styles/Login.css';
import React from "react";


function Login(){

    const loginFn = (event) =>{
        const userEmail = event.getElementById("email");
        const userPassword = event.getElementById("password");
        const userData = {userEmail, userPassword}
        event.preventDefault();
        console.log(userData);
    }
    return (
        <div className="loginPageContainer">
            <div className="loginPage">
                <div className='signin-text'>Sign In</div>
                <form onSubmit={loginFn}>
                    <input type="email" id = "email" placeholder="Enter email address" className="input-email"/>
                    <br />
                    <input type="password" id = "password" placeholder="Enter password" className='input-password'/>
                    <br />
                    <input type="submit" value="SIGN IN" className='signin-button'/>
                </form>
            </div>
        </div>
    )
}

export default Login;


