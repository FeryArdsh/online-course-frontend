import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import instance from "../../../config/instance";
import { updateInstructor } from "../../../service/redux/user";
import css from "./index.module.css";

const InstructorCourses = () => {
    const user = useSelector((state) => state.userData.data);
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.isInstructor) {
            Swal.fire({
                title: "Daftar sebagai instruktur",
                html:
                    '<input id="swal-input1" class="swal2-input" placeholder="Profesi Anda">' +
                    '<textArea id="swal-input2" class="swal2-input" placeholder="Tentang diri Anda"></textArea>',
                focusConfirm: false,
                showCancelButton: true,
                inputValidator: (value) => {
                    console.log(value);
                },
                preConfirm: () => {
                    return [
                        document.getElementById("swal-input1").value,
                        document.getElementById("swal-input2").value,
                    ];
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const obj = {
                        profession: result.value[0],
                        aboutMe: result.value[1],
                    };
                    instance
                        .post("add-instructor", {
                            ...obj,
                        })
                        .then((result) => {
                            console.log(result);
                            dispatch(updateInstructor());
                            return window.location.reload();
                        })
                        .catch((error) => {
                            Swal.fire(
                                error?.response?.data.message,
                                "",
                                "error"
                            ).then(() => window.location.reload());
                        });
                    return;
                }
                {
                    return navigate("/");
                }
            });
        }
    }, []);

    useEffect(() => {
        if (user.isInstructor) {
            const fetchData = async () => {
                const response = await instance.get("courses/instructor");
                setCourse(response.data.courses);
            };
            fetchData();
        }
    }, []);
    console.log(course);
    return (
        <div className={css.containerCourse}>
            <h2>Kursus</h2>
            <Link to="/user/profile/add-courses/draf" className={css.addCourse}>
                Tambah Kursus +
            </Link>
            <div>
                {course?.length === 0 && (
                    <div className={css.listCourse}>
                        <h2 className={css.editCourse}>
                            Kamu belum punya kursus
                        </h2>
                        <h4 className={css.editCourse}>Yuk buat kursus baru</h4>
                    </div>
                )}
                {course?.map((item, i) => (
                    <div className={css.listCourse} key={i}>
                        <h3>{item.ttl}</h3>
                        {item.publish ? <i>Publik</i> : <i>Draf</i>}
                        <p>Total Durasi Video: {item.totalDuration} menit</p>
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
