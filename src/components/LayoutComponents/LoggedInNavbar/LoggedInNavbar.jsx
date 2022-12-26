import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./LoggedInNavbar.module.css";
import SearchBar from "../../../utils/SearchBar/SearchBar";
import hamburgerIcon from "/icons/hamburger.png";
import { useSelector } from "react-redux";
import { AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import LOCAL_STORAGE from "../../../service/localStorage";
import instance from "../../../config/instance";

const LoggedInNavbar = () => {
    let [menuState, setMenuState] = useState(false);
    const user = useSelector((state) => state.userData);
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await instance.post("logout/all");
            LOCAL_STORAGE.clearLocalStorage();
            navigate("/welcome");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={css.navbar}>
            <div
                className={css.menuBox}
                onClick={() => setMenuState((prev) => !prev)}
            >
                <img
                    src={hamburgerIcon}
                    alt="menu icon"
                    className={css.menuIcon}
                />
            </div>
            <div className={css.left}>
                <Link className={css.logoBox} to="/">
                    <img
                        src="/images/logo.svg"
                        alt="logo"
                        className={css.logo}
                    />
                </Link>
            </div>
            <div className={css.right}>
                <div className={css.searchBox}>
                    <SearchBar />
                </div>
                {/* <a className={css.hovBox} href="#" target="_blank">
                    Udemy Bussiness
                </a> */}
                <Link className={css.hovBox} to="/user/profile/courses">
                    Instructor
                </Link>
                <Link className={css.hovBox} to="/user/my-courses/learning">
                    Pembelajaran Saya
                </Link>
                {/* <Link to="/cart" className={css.cartBox}>
                    <img
                        className={css.cartIcon}
                        src="/icons/heart.png"
                        alt="wishlist icon"
                    />
                </Link> */}
                <Link to="/cart" className={css.cartBox}>
                    <span className={css.iconCart}>
                        <AiOutlineShoppingCart size={24} />
                    </span>
                </Link>
                <div className={css.profile}>
                    <img
                        src={
                            user?.data
                                ? user?.data?.imgProfil?.url
                                : "https://gravatar.com/avatar/c78f7619065feb1b84555a528d25f60d?s=400&d=mp&r=x"
                        }
                        className={css.profileIcon}
                    />
                    <div className={css.menuBox}>
                        <div className={css.innerMenuBox}>
                            <div className={css.prflDiv}>
                                <Link
                                    to="/user/profile/settings/basic"
                                    className={css.user}
                                >
                                    <div className={css.leftUserDiv}>
                                        <img
                                            src={
                                                user?.data
                                                    ? user?.data?.imgProfil?.url
                                                    : "https://gravatar.com/avatar/c78f7619065feb1b84555a528d25f60d?s=400&d=mp&r=x"
                                            }
                                            alt="user profile"
                                            className={css.userProfileImg}
                                        />
                                    </div>
                                    <div className={css.rightUserDiv}>
                                        <div className={css.uname}>
                                            {user?.data?.name}
                                        </div>
                                        <div className={css.email}>
                                            {user?.data?.email}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link
                                    to="/user/my-courses/learning"
                                    className={css.menuItem}
                                >
                                    Pembelajaran Saya
                                </Link>
                                <Link to="/cart" className={css.menuItem}>
                                    Keranjang
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Instructor Dashboard
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <div className={css.menuItem2}>
                                    <Link
                                        to="/user/profile/settings/basic"
                                        className={css.menuItem}
                                    >
                                        Setting Akun
                                    </Link>
                                    <Link
                                        to="/user/profile/settings/basic"
                                        className={css.menuItem}
                                    >
                                        <AiOutlineSetting size={20} />
                                    </Link>
                                </div>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link
                                    to="user/koushil"
                                    className={css.menuItem}
                                >
                                    Profil Publik
                                </Link>
                                <Link
                                    to="/user/profile/settings/photo"
                                    className={css.menuItem}
                                >
                                    Edit Foto Profil
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Help
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv} onClick={onLogout}>
                                <div className={css.logout}>
                                    <span>Logout</span>
                                    <span>
                                        <BiLogIn size={20} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoggedInNavbar;
