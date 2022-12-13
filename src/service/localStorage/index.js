const LOCAL_STORAGE = {
    setDataUser(data) {
        return localStorage.setItem("user", JSON.stringify(data));
    },
    getDataUser() {
        return JSON.parse(localStorage.getItem("user"));
    },
    removeDataUser() {
        return localStorage.removeItem("user");
    },
    clearLocalStorage() {
        return localStorage.clear();
    },
};

export default LOCAL_STORAGE;
