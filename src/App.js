import { Route, Switch } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { PATHS } from "./config";
import AppGlobalProvider from "./context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    return (
        <div>
            <AppGlobalProvider>
                <Switch>
                    <ProtectedRoute path={PATHS.home} component={Home} exact={true} />
                    <Route path={PATHS.login} component={Login} exact={true} />
                    <Route path={PATHS.signup} component={Signup} exact={true} />
                </Switch>
            </AppGlobalProvider>
        </div>
    );
}

export default App;
