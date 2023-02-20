import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Layout1 from "../../Layout1/Layout1";
import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import user from "/icons/user.png";
import email from "/icons/email.png";
import lock from "/icons/lock.png";
import css from "./Signup.module.css";
import instance from "../../../config/instance";
import Swal from "sweetalert2";
import LoadingComp from "../../../components/LoadingComp";

const Signup = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        check: true,
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    let changeHanlder = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    let submitHandler = async () => {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const regexPassword =
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (
            !regexEmail.test(state.email) ||
            !regexPassword.test(state.password) ||
            state.name.length < 4
        ) {
            return setError(true);
        }
        setError(false);
        setLoading(true)
        const { name, email, password } = state;
        try {
            const response = await instance.post("signup", {
                name,
                email,
                password,
            });
            console.log(response);
            await Swal.fire({
                title: "Berhasil mendaftar",
                icon: "success",
                timer: 2000,
            });
            setLoading(false)
            navigate("/join/login");
        } catch (error) {
            setLoading(false)
            Swal.fire({ title: error.response.data.message, icon: "error" });
            console.log(error);
        }
    };

    return (
        <>
            <Layout1>
                <div className={css.outerDiv}>
                    <div className={css.loginBox}>
                        <div className={css.ttl}>
                            Daftar untuk menjadi Siswa atau Instructor
                        </div>
                        <hr />
                        {error && (
                            <span className={css.errLogin}>
                                *Input tidak sesuai
                            </span>
                        )}
                        <div className={css.boxBdy}>
                            <InputUtil
                                type="text"
                                name="name"
                                state={state.name}
                                icon={user}
                                placeholderTxt="Nama Lengkap"
                                onChange={changeHanlder}
                            />
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
                            <div className={css.psw}>
                                <h4 style={{ color: "red" }}>Catatan Password:</h4>
                                <p>*Password minimal 8 karakter</p>
                                <p>
                                    *Terdapat minimal 1 huruf kapital, ankga dan
                                    simbol
                                </p>
                            </div>
                            {/* <CheckboxUtil
                                label="Send me special offers, personalized recommendations, and learning tips."
                                type="checkbox"
                                name="checkbox"
                                id="checkbox"
                                state={state.check}
                                onChange={checkboxChangeHanlder}
                            /> */}
                            {loading ? <LoadingComp /> :
                                <Button1
                                    txt="Daftar"
                                    color="var(--white)"
                                    bck="var(--primary)"
                                    hovBck="var(--primary-dark)"
                                    extraCss={{
                                        width: "100%",
                                        margin: "7px 0",
                                        border: "none",
                                        padding: "1rem",
                                    }}
                                    onClick={submitHandler}
                                />}
                            <div className={css.blck}>
                                <span className={css.blckTxt}>
                                    By signing up, you agree to our
                                    <Link
                                        to="/join/forgot-password"
                                        className={css.anchor}
                                    >
                                        Terms of Use
                                    </Link>
                                    and
                                    <Link
                                        to="/join/forgot-password"
                                        className={css.anchor}
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </span>
                            </div>
                            <div className={css.blck}>
                                <span className={css.blckTxt2}>
                                    Sudah punya akun?
                                </span>
                                <Link to="/join/login" className={css.anchor}>
                                    <b>Login</b>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout1>
        </>
    );
};

export default Signup;
