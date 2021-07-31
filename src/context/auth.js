import { createContext, useReducer } from "react";
import storage from "store2";

const initialAuthState = {
    is_authenticated: false,
    token: storage.has("token") ? storage.get("token") : "",
    refreshToken: storage.has("refreshToken") ? storage.get("refreshToken") : "",
    user: undefined,
    // user_id: storage.has("user_id") ? storage.get("user_id") : "",
};

// reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case "AUTHENTICATE_USER":
            return {
                ...state,
                is_authenticated: action.payload,
            };
        case "SET_DATA":
            const { user_id, token, refreshToken } = action.payload;
            if (token && state.token !== token) storage.set("token", token);
            if (refreshToken && state.refreshToken !== refreshToken) storage.set("token", refreshToken);
            // if (user_id && state.user_id !== user_id) storage.set("user_id", user_id);
            return {
                ...state,
                ...action.payload,
            };
        case "LOGOUT_USER":
            storage.clearAll();
            return {
                ...state,
                is_authenticated: false,
                token: "",
                user: undefined,
                // user_id: "",
            };
        default:
            return state;
    }
};

const AuthContext = createContext(initialAuthState);

//provider
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    const dispatches = {
        authenticateUser(validAuthentication) {
            dispatch({
                type: "AUTHENTICATE_USER",
                payload: validAuthentication,
            });
        },
        setAuthContext(data) {
            dispatch({
                type: "SET_DATA",
                payload: data,
            });
        },
        logoutUser() {
            dispatch({
                type: "LOGOUT_USER",
            });
        },
    };
    return <AuthContext.Provider value={{ ...state, ...dispatches }}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
