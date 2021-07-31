import storage from "store2";

const initialAuthState = {
    is_authenticated: false,
    id_token: storage.has("id_token") ? storage.get("id_token") : "",
    user: undefined,
    user_id: storage.has("user_id") ? storage.get("user_id") : "",
};
