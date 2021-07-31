import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { PATHS } from "../config";
import { AuthContext } from "../context/auth";

const ProtectedRoute = ({ component: Component = null, render: Render = null, path, exact, ...rest }) => {
    const { is_authenticated } = useContext(AuthContext);
    const routeComponent = (props) =>
        is_authenticated ? Render ? Render(props) : Component ? <Component {...props} /> : null : <Redirect to={{ pathname: PATHS.login }} />;
    return <Route path={path} exact={exact} {...rest} render={routeComponent} />;
};

export default ProtectedRoute;
