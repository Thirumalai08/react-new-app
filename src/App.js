import { Route, Switch } from "react-router-dom";
import "./App.css";
import { PATHS } from "./config";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    return (
        <div>
            <Switch>
                <Route path={PATHS.home} component={Home} exact={true} />
                <Route path={PATHS.login} component={Login} exact={true} />
                <Route path={PATHS.signup} component={Signup} exact={true} />
            </Switch>
        </div>
    );
}

export default App;
