import axios from "axios";
import LOCAL_STORAGE from "../service/localStorage";

const token = LOCAL_STORAGE.getDataUser();
const instance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: { "x-auth-token": token.token },
});

export default instance;
