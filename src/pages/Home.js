import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";

function Home() {
    const { user, logoutUser, token } = useContext(AuthContext);
    console.log("User", user);
    const [user_info, setUserInfo] = useState("");
    // const getUserInfo = async () => {
    //     const response = await axios({
    //         method: "GET",
    //         url: `${process.env.REACT_APP_SERVICES_BASE_URL}/api/auth`,
    //         headers: {
    //             "x-auth-token": `${token}`,
    //         },
    //     });
    //     setUserInfo(response.data);
    // };
    console.log(">>>>>>>>>>>.user_info", user_info);
    useEffect(() => {
        const getUserInfo = async () => {
            const response = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_SERVICES_BASE_URL}/api/auth`,
                headers: {
                    "x-auth-token": `${token}`,
                },
            });
            setUserInfo(response.data);
        };
        getUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <h1>Home Page</h1>
            <h1>Hello {user_info.name}</h1>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
}

export default Home;
