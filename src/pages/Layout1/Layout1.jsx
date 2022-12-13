import { useState } from "react";
import { createPortal } from "react-dom";

import Navbar from "../../components/LayoutComponents/Navbar1/Navbar";
import LoggedInNavbar from "../../components/LayoutComponents/LoggedInNavbar/LoggedInNavbar";
import Footer from "../../components/LayoutComponents/Footer/Footer";
import LoginModal from "../../components/Auth/LoginModal/LoginModal";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import LOCAL_STORAGE from "../../service/localStorage";

const Layout1 = ({ children }) => {
    const allowedBy = LOCAL_STORAGE.getDataUser();
    let comp = <Navbar />;

    if (allowedBy) {
        comp = <LoggedInNavbar />;
    }
    return (
        <>
            {comp}
            {children}
            <Footer />
        </>
    );
};

export default Layout1;
