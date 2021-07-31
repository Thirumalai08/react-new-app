import React from "react";
import { AuthContext, AuthProvider } from "./auth";

const AppGlobalProvider = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

export { AuthContext };

export default AppGlobalProvider;
