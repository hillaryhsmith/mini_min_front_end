import axios from 'axios';
import { useState } from "react" 

const Login = ({setActiveLearner}) => {

    const [loginMessage, setLoginMessage] = useState("Login");

    const getLoginURL = (username, password) => {
        return 'http://localhost:8080' 
            + '/learners'
            + '/' + username
            + '/' + password
            + '/login';
    };

    const attemptLogin = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        axios.get(getLoginURL(username, password)).then((response) => {
            console.log(response.data);
            setActiveLearner({id: response.data, name: username});
            setLoginMessage("Login successful!");
        }).catch((err) => {
            setLoginMessage("Login failed!");
        });
    };
    return (
    <div>
        <h1>{loginMessage}</h1>
        <div id="usernameInput">
            <label>Username:</label>
            <input type="text" id="username"/>
        </div>
        <div id="passwordInput">
            <label>Password:</label>
            <input type="text" id="password"/>
        </div>
        <div>
            <button type="button" onClick={attemptLogin}>
            Submit credentials
            </button>
        </div>
    </div>
    )
};

export default Login;