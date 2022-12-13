import React, { useState } from "react";
import { Link } from "react-router-dom";

import css from "./LoggedInNavbar.module.css";

import SearchBar from "../../../utils/SearchBar/SearchBar";

import globeIcon from "/icons/globe.png";
import userEmptyIcon from "/icons/user-empty.png";
import hamburgerIcon from "/icons/hamburger.png";
import exitIcon from "/icons/exit.png";
import { useSelector } from "react-redux";

const LoggedInNavbar = () => {
    let [menuState, setMenuState] = useState(false);
    const user = useSelector((state) => state.userData);

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
                <a className={css.hovBox} href="#" target="_blank">
                    Udemy Bussiness
                </a>
                <Link className={css.hovBox} to="/">
                    Instructor
                </Link>
                <Link className={css.hovBox} to="/user/my-courses">
                    Pembelajaran Saya
                </Link>
                <Link to="/cart" className={css.cartBox}>
                    <img
                        className={css.cartIcon}
                        src="/icons/heart.png"
                        alt="wishlist icon"
                    />
                </Link>
                <Link to="/cart" className={css.cartBox}>
                    <img
                        className={css.cartIcon}
                        src="/icons/shopping-cart.png"
                        alt="cart icon"
                    />
                </Link>
                <div className={css.profile}>
                    <img
                        src={user?.data?.imgProfil.url}
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
                                            src={user?.data?.imgProfil.url}
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
                                <Link
                                    to="/user/profile/settings/basic"
                                    className={css.menuItem}
                                >
                                    Setting Akun
                                </Link>
                            </div>
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
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <Link to="/" className={css.menuItem}>
                                    Help
                                </Link>
                                <Link to="/" className={css.menuItem}>
                                    Logout
                                </Link>
                            </div>
                            <hr className={css.hr} />
                            <div className={css.prflDiv}>
                                <div className={css.menuItem2}>
                                    <span>
                                        <div className={css.menuItemTxt1}>
                                            Udemy Bussiness
                                        </div>
                                        <div className={css.menuItemTxt2}>
                                            Bring learning to your company
                                        </div>
                                    </span>
                                    <span>
                                        <img
                                            src={exitIcon}
                                            className={css.icon}
                                            alt="exit icon"
                                        />
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
