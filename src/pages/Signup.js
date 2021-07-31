import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { PATHS } from "../config";
import { AuthContext } from "../context";

function Signup() {
    const { setAuthContext, authenticateUser } = useContext(AuthContext);
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                const response = await axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_SERVICES_BASE_URL}/api/users`,
                    data: { name, email, password },
                });
                console.log("success", response);
                authenticateUser(true);
                setAuthContext({
                    user: response.data.user_id,
                    token: response.data.token,
                    // refreshToken: response.data.refresh_token
                });
                // if (response.data.token) {
                //     setAuthContext({ token: response.data.token });
                // }
                // authenticateUser(true);
                history.push(PATHS.home);
            } catch (err) {
                console.error(err);
            }
        }
    };
    return (
        <div>
            <h1>Signup Page</h1>
            <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                <input type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter name" />
                <br />
                <input type="text" name="email" value={email} onChange={(e) => onChange(e)} placeholder="Enter Email" />
                <br />
                <input type="password" name="password" value={password} onChange={(e) => onChange(e)} placeholder="Enter Password" />
                <br />
                <button type="submit">Singup</button>
            </form>
            <p>
                Already have an account ?{" "}
                <span>
                    <Link to={PATHS.login}>Login</Link>
                </span>
            </p>
        </div>
    );
}

export default Signup;
