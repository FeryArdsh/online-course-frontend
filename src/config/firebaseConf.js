import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp({
    apiKey: "AIzaSyB0zUDU7jgCv7HaA5MWS_bSJ3ipUYWiPW4",
    authDomain: "online-course-5f206.firebaseapp.com",
    projectId: "online-course-5f206",
    storageBucket: "online-course-5f206.appspot.com",
    messagingSenderId: "265263833091",
    appId: "1:265263833091:web:3a9c7c0eb1c050f92cee36",
});

const storage = getStorage(app);
export default storage;
