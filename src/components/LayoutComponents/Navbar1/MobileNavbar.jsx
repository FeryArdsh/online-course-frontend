import React from "react";
import css from "./Navbar.module.css";

import SearchBar from "../../../utils/SearchBar/SearchBar";
import Button1 from "../../../utils/Buttons/Button1/Button1";

import cartIcon from "/icons/shopping-cart.png";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <>
      <div className={css.sidebarMenu}>
        <div className={css.searchBoxM}>
          {/* <SearchBar /> */}
        </div>
        <Link className={css.hovBoxM} to={"/join/signup"}>
          Mengajar di CourseIn
        </Link>
        <div className={css.btnsM}>

          <Button1 txt="Login" link="/join/login" extraCss={{ "border": "1px solid #306de4" }} color="#306de4" hovBck="#2764df02" />
          <Button1
            txt="Sign up"
            bck="#306de4"
            link="/join/signup"
            color="#fff"
            hovBck="#2764df"
          />
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
