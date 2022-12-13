import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Layout1 from "../../Layout1/Layout1";

import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../../utils/Buttons/Button1/Button1";

// import fImg from "/icons/facebook.svg";
// import gImg from "/icons/google.svg";
// import aImg from "/icons/apple-logo.svg";
import email from "/icons/email.png";
import lock from "/icons/lock.png";

import css from "./Login.module.css";
import instance from "../../../config/instance";
import LOCAL_STORAGE from "../../../service/localStorage";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addUser } from "../../../service/redux/user";

const login = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    // const oauth = [
    //     { img: fImg, txt: "Continue with Facebook", link: "/facebook-auth" },
    //     { img: gImg, txt: "Continue with Google", link: "/google-auth" },
    //     { img: aImg, txt: "Continue with Apple", link: "/apple-auth" },
    // ];

    let changeHanlder = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    let submitHandler = async () => {
        if (!state.email.includes("@") || state.password.length < 6) {
            setError(true);
            return;
        }
        setError(false);
        try {
            const response = await instance.post("login", {
                email: state.email,
                password: state.password,
            });
            await Swal.fire({
                title: "Berhasil login",
                icon: "success",
                timer: 2000,
            });
            navigate("/");
            LOCAL_STORAGE.setDataUser(response.data);
        } catch (error) {
            if (error.response.status === 404) {
                return Swal.fire({
                    title: "Email atau password salah",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
            Swal.fire({
                title: "Terjadi Kesalahan",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
            console.log(error);
        }
    };

    return (
        <>
            <Layout1>
                <div className={css.outerDiv}>
                    <div className={css.loginBox}>
                        <div className={css.ttl}>
                            Login dengan akun CourseIn
                        </div>
                        <hr />
                        <div className={css.boxBdy}>
                            {/* {oauth?.map((item, id) => {
                                return (
                                    <div className={css.oauth} key={id}>
                                        <img
                                            src={item?.img}
                                            alt="login img"
                                            className={css.icon}
                                        />
                                        <span className={css.txt}>
                                            {item?.txt}
                                        </span>
                                    </div>
                                );
                            })} */}

                            {error ? (
                                <span className={css.errLogin}>
                                    *Input tidak sesuai
                                </span>
                            ) : (
                                ""
                            )}

                            <InputUtil
                                type="email"
                                name="email"
                                state={state.email}
                                icon={email}
                                placeholderTxt="Email"
                                onChange={changeHanlder}
                            />
                            <InputUtil
                                type="password"
                                name="password"
                                state={state.password}
                                icon={lock}
                                placeholderTxt="Password"
                                onChange={changeHanlder}
                            />
                            <Button1
                                txt="Login"
                                color="var(--white)"
                                bck="var(--purple)"
                                hovBck="var(--purple-dark)"
                                extraCss={{
                                    width: "100%",
                                    margin: "7px 0px",
                                    border: "none",
                                    padding: "1rem",
                                }}
                                onClick={submitHandler}
                            />
                            <div className={css.blck}>
                                <Link
                                    to="/join/forgot-password"
                                    className={css.anchor}
                                >
                                    Lupa password?
                                </Link>
                            </div>
                            <div className={css.blck}>
                                <span className={css.blckTxt}>
                                    Tidak punya akun?
                                </span>
                                <Link to="/join/signup" className={css.anchor}>
                                    <b>Daftar</b>
                                </Link>
                            </div>
                            {/* <div className={css.blck}>
                                <Link to="/join/login" className={css.anchor}>
                                    <b>Login with your organization</b>
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Layout1>
        </>
    );
};

export default login;
