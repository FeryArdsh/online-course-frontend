import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import LOCAL_STORAGE from "../../service/localStorage";

const ProtectedRoute = () => {
    const allowedBy = LOCAL_STORAGE.getDataUser();
    if (!allowedBy) {
        Swal.fire({
            icon: "error",
            text: "Kamu belum login",
            timer: 1500,
            showConfirmButton: false,
        });
        return <Navigate to="/join/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
