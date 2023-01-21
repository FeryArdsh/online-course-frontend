import React, { useState } from "react";
import { Link } from "react-router-dom";

import css from "./Navbar.module.css";

import MobileNavbar from "./MobileNavbar";
import SearchBar from "../../../utils/SearchBar/SearchBar";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import LanguageChangeCard from "../../Cards/LanguageChangeCard/LanguageChangeCard";

import globeIcon from "/icons/globe.png";
import hamburgerIcon from "/icons/hamburger.png";

const Navbar = () => {
    let [menuState, setMenuState] = useState(false);
    const [modal, setModal] = useState(false);

    return (
        <>
            <div className={css.navbar}>
                {modal ? <LanguageChangeCard setModal={setModal} /> : ""}
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
                    <Link className={css.logoBox} to="/welcome">
                        <img
                            src="/images/logo.svg"
                            alt="logo"
                            className={css.logo}
                        />
                    </Link>
                </div>
                <div className={css.right}>
                    <div className={css.searchBox}>
                        {/* <SearchBar /> */}
                    </div>
                    <div>
                        <div className={css.btnAuth}>
                            <Link className={css.hovBox} to={"/join/signup"} style={{ textDecoration: "underline" }}>
                                Mengajar di CourseIn
                            </Link>
                            <Button1 txt="Login" link="/join/login" />
                            <Button1
                                txt="Sign up"
                                bck="#1c1d1f"
                                link="/join/signup"
                                color="#fff"
                                hovBck="#000"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {menuState ? <MobileNavbar /> : ""}
        </>
    );
};

export default Navbar;
