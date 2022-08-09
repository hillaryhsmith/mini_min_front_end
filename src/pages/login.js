import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginUrl = process.env.REACT_APP_BACKEND_URL 
    + '/learners/login';


const Login = ({setActiveLearner}) => {
    const [loginMessage, setLoginMessage] = useState("Login");
    const navigate = useNavigate();

    const attemptLogin = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        axios.post(loginUrl, {"username": username, "password": password}).then((response) => {
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
        <div id="login-container">
        <form>
                <div id="username-input">
                    <label>Username:</label>
                    <br></br>
                    <input type="text" id="username"/>
                </div>
                <div id="password-input">
                    <label>Password:</label>
                    <br></br>
                    <input type="password" id="password"/>
                </div>
            </form>
            </div>
            <br></br>
        <div id="button-container">
            <div>
                <button type="button" onClick={attemptLogin}>
                Submit credentials
                </button>
            </div>
            <br></br>
            <div>
                <button type="button" onClick={logout}>
                Log out
                </button>
            </div>
        </div>
    </div>
    )
};

export default Login;