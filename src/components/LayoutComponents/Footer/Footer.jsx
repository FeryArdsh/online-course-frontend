import React from "react";
import { Link } from "react-router-dom";
import logo from "/images/logoWhite.svg";

import css from "./Footer.module.css";
// import Button1 from "../../../utils/Buttons/Button1/Button1";

const Footer = () => {
    return (
        <div className={css.outerDiv}>
            <div className={css.innerDiv}>
                <div className={css.clmns}>
                    <div className={css.clmn}>
                        <ul className={css.cul}>
                            <li className={css.cli}>
                                <h3>Navigasi</h3>
                            </li>
                            <li className={css.cli}>
                                <Link to="/">Beranda</Link>
                            </li>
                            <li className={css.cli}>
                                <Link to="/join/login">Login</Link>
                            </li>
                            <li className={css.cli}>
                                <Link to="/join/signup">Register</Link>
                            </li>
                        </ul>

                    </div>
                    {/* <div className={css.clmn}>
                        <ul className={css.cul}>
                            <li className={css.cli}>
                                <Link to="/">Karir</Link>
                            </li>
                            <li className={css.cli}>
                                <Link to="/">Blog</Link>
                            </li>
                            <li className={css.cli}>
                                <Link to="/">Help and Support</Link>
                            </li>
                            <li className={css.cli}>
                                <Link to="/">Affiliate</Link>
                            </li>
                            <li className={css.cli}>
                                <Link to="/">Investors</Link>
                            </li>
                        </ul>
                    </div> */}
                    <div className={css.clmn}>
                        <ul className={css.cul}>
                            {/* <li className={css.cli}>
                                <Link to="/">Udemy Bussiness</Link>
                            </li> */}
                            <li className={css.cli}>
                                <Link to="/">Mengajar di CourseIn</Link>
                            </li>
                            <li className={css.cli}>
                                <Link to="/">Tentang</Link>
                            </li>
                            <li className={css.cli}>
                                <Link to="/">Kontak</Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className={[css.lastChild, css.clmn].join(" ")}>
                        <Button1
                            img={globeIcon}
                            txt="English"
                            bck="#1c1d1f"
                            color="#fff"
                            hovBck="rgba(255,255,255,.08)"
                            extraCss={{ border: "1px solid #fff" }}
                            imageCss={{ filter: "invert(1)" }}
                        />
                    </div> */}
                </div>
                <div className={css.creds}>
                    <div className={css.cred1}>
                        <img className={css.img} src={logo} alt="logo" />
                    </div>
                    <div className={css.cred2}>
                        © {new Date().getFullYear()} CourseIn, Inc.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
