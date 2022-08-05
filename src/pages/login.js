import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const getLoginURL = (username, password) => {
    return process.env.REACT_APP_BACKEND_URL
        + '/learners'
        + '/' + username
        + '/' + password
        + '/login';
};

const Login = ({setActiveLearner}) => {
    const [loginMessage, setLoginMessage] = useState("Login");
    const navigate = useNavigate();

    const attemptLogin = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        axios.get(getLoginURL(username, password)).then((response) => {
            setActiveLearner({id: response.data, name: username});
            navigate("/about");
        }).catch((err) => {
            setLoginMessage("Login failed!");
        });
    };

    const logout = () => {
        setActiveLearner(null);
        setLoginMessage("Login");
    }

    return (
    <div>
        <h1>{loginMessage}</h1>
        <div id="usernameInput">
            <label>Username:</label>
            <input type="text" id="username"/>
        </div>
        <div id="passwordInput">
            <label>Password:</label>
            <input type="password" id="password"/>
        </div>
        <div>
            <button type="button" onClick={attemptLogin}>
            Submit credentials
            </button>
        </div>
        <div>
            <button type="button" onClick={logout}>
            Log out
            </button>
        </div>
    </div>
    )
};

export default Login;