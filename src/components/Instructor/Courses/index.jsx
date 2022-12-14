import React from "react";
import { Link } from "react-router-dom";
import css from "./index.module.css";

const InstructorCourses = () => {
    const yourCourse = [
        {
            ttl: "Belajar MERN",
            totalDuration: 39,
        },
        {
            ttl: "Belajar MERN",
        },
    ];
    return (
        <div className={css.containerCourse}>
            <h2>Kursus</h2>
            <Link to="/user/profile/add-courses" className={css.addCourse}>
                Tambah Kursus +
            </Link>
            <div>
                {yourCourse?.map((item) => (
                    <div className={css.listCourse}>
                        <h3>{item.ttl}</h3>
                        {item.totalDuration ? (
                            <span>Publik</span>
                        ) : (
                            <span>Draf</span>
                        )}
                        <Link to="/edit-course" className={css.editCourse}>
                            Edit/Selesaikan
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorCourses;
