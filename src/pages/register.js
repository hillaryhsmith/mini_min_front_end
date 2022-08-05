import axios from 'axios';
import { useState } from "react" 

const registerNewLearnerURL = process.env.REACT_APP_BACKEND_URL
+ '/learners';

const anyEmpty = (username, password, email) => {
    if (username.length === 0 || password.length === 0 || email.length === 0) {
        return true;
    } else {
        return false;
    }
}

const Register = () => {
    const [registrationMessage, setRegistrationMessage] = useState("");
    
    const registerNewLearner = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        if (anyEmpty(username, password, email)) {
            setRegistrationMessage("Empty fields are not allowed");
            return;
        } 

        axios.post(registerNewLearnerURL, {
            "username" : username,
            "password" : password,
            "email" : email
        }).then((response) => {
            setRegistrationMessage("Registration successful!")
        }).catch((err) => {
            setRegistrationMessage("Registration failed!");
        });
    };

    return (
    <div>
        <h1>Register</h1>
        <h2>{registrationMessage}</h2>
        <div id="usernameInput">
            <label>Username:</label>
            <input type="text" id="username"/>
        </div>
        <div id="passwordInput">
            <label>Password:</label>
            <input type="text" id="password"/>
        </div>
        <div id="emailInput">
            <label>Email address:</label>
            <input type="text" id="email"/>
        </div>
        <div>
            <button type="button" onClick={registerNewLearner}>
            Register learner
            </button>
        </div>
    </div>
        )

};

export default Register;