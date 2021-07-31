import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { PATHS } from "../config";
import { AuthContext } from "../context";

function Login() {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const { setAuthContext, authenticateUser } = useContext(AuthContext);
    const onSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                const response = await axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_SERVICES_BASE_URL}/api/login`,
                    data: { email, password },
                });
                console.log("success", response);
                if (response.data.token) {
                    setAuthContext({
                        token: response.data.token,
                        user: response.data.user_id,
                        // refreshToken: response.data.refresh_token
                    });
                }
                authenticateUser(true);
                // setAuthContext({
                //     user: response.data.user_id,
                // });
                history.push(PATHS.home);
            } catch (err) {
                console.error(err);
            }
        }
    };
    return (
        <div>
            <h1>Login Page</h1>
            <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                <input type="text" name="email" value={email} onChange={(e) => onChange(e)} placeholder="Enter Email" />
                <br />
                <input type="password" name="password" value={password} onChange={(e) => onChange(e)} placeholder="Enter Password" />
                <br />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account ?{" "}
                <span>
                    <Link to={PATHS.signup}>Signup</Link>
                </span>
            </p>
        </div>
    );
}

export default Login;
