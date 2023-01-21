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
    </>
  );
};

export default MobileNavbar;
