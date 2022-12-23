import { useEffect, useState } from "react";
import instance from "../../../config/instance";
import HelpCard from "../../Cards/HelpCard/HelpCard";
import css from "./ResourcesComponent.module.css";
import teachIcon from "/icons/teach.png";

const ResourcesComponent = () => {
    const [instructor, setInstructor] = useState(null);
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await instance.get("profile/instructor");
                setInstructor(response.data.instructor);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCourse();
    }, []);
    const income = instructor?.income?.reduce((accumulator, object) => {
        return accumulator + object.amount;
    }, 0);
    const peserta = instructor?.income?.length;
    return (
        <div className={css.outerDiv}>
            <div className={css.ttl}>Pendapatan Instructor</div>
            <div className={css.cards}>
                <div>
                    <h4>Total Pendapatan Tahun {new Date().getFullYear()}</h4>
                    {income ? (
                        <p className={css.income}>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(income)}
                        </p>
                    ) : (
                        <p className={css.income}>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(0)}
                        </p>
                    )}
                    <div className={css.inerCard}>
                        <h4>{instructor?.numberOfCourses}</h4>
                        total kursus Anda
                    </div>
                    {income ? (
                        <div className={css.inerCard}>
                            <h4>{peserta}</h4>
                            total peserta Anda
                        </div>
                    ) : (
                        <div className={css.inerCard}>
                            <h4>0</h4>
                            total peserta Anda
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResourcesComponent;
