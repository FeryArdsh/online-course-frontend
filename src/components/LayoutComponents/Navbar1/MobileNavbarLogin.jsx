import React from "react";
import css from "./Navbar.module.css";

import cartIcon from "/icons/shopping-cart.png";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

const MobileNavbarLogin = ({ onClick }) => {
    return (
        <>
            <div className={css.sidebarMenu}>
                <div className={css.searchBoxM}>
                    {/* <SearchBar /> */}
                </div>
                <div className={css.loginNav}>
                    <Link className={css.logoBox} to="/welcome">
                        <img
                            src="/images/logo.svg"
                            alt="logo"
                            className={css.logo}
                        />
                    </Link>
                    <Link
                        to="/user/my-courses/learning"
                        className={css.linkNav}
                    >
                        Pembelajaran Saya
                    </Link>
                    <Link to="/cart" className={css.linkNav}>
                        Keranjang
                    </Link>
                    <Link to="/user/profile/courses" className={css.linkNav}>
                        Instruktur Dashboard
                    </Link>
                    <div className={css.prflDiv} onClick={onClick}>
                        <div className={css.logout}>
                            <span>Logout</span>
                            <span className={css.logout}>
                                <BiLogIn size={20} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileNavbarLogin;
