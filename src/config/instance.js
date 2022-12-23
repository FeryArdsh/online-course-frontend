import axios from "axios";
import LOCAL_STORAGE from "../service/localStorage";

const token = LOCAL_STORAGE.getDataUser();
const instance = axios.create({
    baseURL: "http://localhost:5000/",
    // headers: { "x-auth-token": token?.token },
});

instance.interceptors.request.use(
    (config) => {
        const token = LOCAL_STORAGE.getDataUser();

        if (token) {
            config.headers["x-auth-token"] = `${token?.token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
