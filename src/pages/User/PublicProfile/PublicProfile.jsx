import CourseCard from "../../../components/Cards/CourseCard/CourseCard";
import Layout1 from "../../Layout1/Layout1";

import css from "./PublicProfile.module.css";
import { useParams } from "react-router-dom";
import instance from "../../../config/instance";
import { useEffect, useState } from "react";

const PublicProfile = () => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoading(true);
                const response = await instance.get("course-instructor/" + id);
                setCourses(response.data.instructor);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchdata();
    }, []);

    return (
        <Layout1>
            <div className={css.outerDiv}>
                <div className={css.topBar}>
                    <div className={css.userBar}>
                        <div className={css.user}>Semua Kursus Instruktur</div>
                    </div>
                </div>
            </div>
            <div className={css.menuTopBar}>
                <div className={css.innerMenuTopBar}>
                    <div className={css.profileBar}>
                        <img
                            src={courses?.studentID?.imgProfil?.url}
                            alt="profile pic"
                            className={css.profilePic}
                        />
                        <h3>{courses?.studentID?.name.toUpperCase()}</h3>
                    </div>
                </div>
            </div>
            <div className={css.bdy}>
                <div className={css.innerBdy}>
                    {courses?.courses?.map((item, id) => {
                        return <CourseCard key={id} data={item} />;
                    })}
                </div>
            </div>
        </Layout1>
    );
};

export default PublicProfile;
