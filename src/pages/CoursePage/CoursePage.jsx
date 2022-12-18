import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    Learnings,
    courseIncludes,
    courseDetails,
    courseData,
    courseReq,
    desc,
    courseDetData,
    moreCourses,
    instructorData,
    featuredReviewUserData,
} from "../../fakedata/fakedata.js";

import Layout1 from "../Layout1/Layout1";
import CourseHeaderComp from "../../components/CourseComponents/CourseHeaderComp/CourseHeaderComp";
import TextPointsNoter from "../../components/CourseComponents/TextPointsNoter/TextPointsNoter";
import CourseIncludesCard from "../../components/Cards/CourseIncludesCard/CourseIncludesCard";
import CourseReqComp from "../../components/CourseComponents/CourseReqComp/CourseReqComp";
import CourseDescriptionComp from "../../components/CourseComponents/CourseDescriptionComp/CourseDescriptionComp";
import FeaturedReviewComp from "../../components/CourseComponents/FeaturedReviewComp/FeaturedReviewComp";
import StudentsAlsoBought from "../../components/CourseComponents/StudentsAlsoBought/StudentsAlsoBought";
import CourseInstructorComp from "../../components/CourseComponents/CourseInstructorComp/CourseInstructorComp";
import CourseCard from "../../components/Cards/CourseCard/CourseCard";
import ShareCourseCard from "../../components/Cards/ShareCourseCard/ShareCourseCard";
import CourseDetailsTabComp from "../../components/CourseComponents/CourseDetailsTabComp/CourseDetailsTabComp";

import Button1 from "../../utils/Buttons/Button1/Button1";

import css from "./CoursePage.module.css";
import instance from "../../config/instance.js";

const CoursePage = () => {
    const [shareModal, setShareModal] = useState(false);
    const [course, setCourse] = useState(null);
    const [corsInstructor, setCorsInstructor] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await instance.get("course/" + id);
                const res = await instance.get("courses/instructor");
                setCourse(response.data.course);
                setCorsInstructor(res.data.courses);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCourse();
    }, []);

    console.log(course);
    // console.log(corsInstructor);
    return (
        <>
            {shareModal ? (
                <ShareCourseCard
                    ttl="Bagikan Kursus ini"
                    txt={location.href}
                    btnTxt="Copy"
                    closeModal={() => setShareModal(false)}
                />
            ) : null}
            <Layout1>
                <div className={css.outerDiv}>
                    {course && (
                        <CourseHeaderComp
                            data={course}
                            setShareModal={setShareModal}
                        />
                    )}
                    <div className={css.innerDiv}>
                        <div className={css.bodySec}>
                            {/* <TextPointsNoter data={Learnings} /> */}
                            {/* <div className={css.boxSection}>
                                <div className={css.secTtl}>
                                    This course includes:
                                </div>
                                <div className={css.secBdy}>
                                    {courseIncludes?.map((item) => {
                                        return (
                                            <CourseIncludesCard
                                                key={item.id}
                                                data={item}
                                            />
                                        );
                                    })}
                                </div>
                            </div> */}
                            <div className={css.boxSection}>
                                <div className={css.secTtl}>Course content</div>
                                <div className={css.secBdy}>
                                    <CourseDetailsTabComp
                                        courseData={course?.videos}
                                    />
                                </div>
                            </div>
                            <div className={css.boxSection}>
                                <CourseReqComp
                                    data={course?.courseRequirements}
                                />
                            </div>
                            <div className={css.boxSection}>
                                <CourseDescriptionComp
                                    ttl="Deskripsi"
                                    desc={course?.fullDesc}
                                />
                            </div>
                            {/* <div className={css.boxSection}>
                                <StudentsAlsoBought ttl="Students also bought" />
                            </div> */}
                            <div className={css.boxSection}>
                                <FeaturedReviewComp
                                    data={featuredReviewUserData}
                                />
                            </div>
                            <div className={css.boxSection}>
                                <div className={css.secTtl}>
                                    {course && (
                                        <CourseInstructorComp
                                            data={course?.createdBy}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={css.boxSection} key={id}>
                                <div className={css.secTtl}>
                                    More courses by
                                    {/* <Link to={course.link}>
                                        {course.instructor}
                                    </Link> */}
                                </div>
                                <div className={css.secBdy}>
                                    {corsInstructor?.map((item) => {
                                        return (
                                            <CourseCard
                                                key={item.id}
                                                data={item}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <hr />
                            {/* <Button1
                                txt="Report abuse"
                                extraCss={{ width: "100%" }}
                            /> */}
                        </div>
                        <div className={css.rightSidebar}></div>
                    </div>
                </div>
            </Layout1>
        </>
    );
};

export default CoursePage;
