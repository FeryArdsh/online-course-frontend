import { useEffect, useState } from "react";

import Layout1 from "../../Layout1/Layout1";
import VerticalCategoryMenuBar from "../../../components/LayoutComponents/VerticalCategoryMenuBar/VerticalCategoryMenuBar";
import CategoryTabsBox from "../../../components/HomePageComponents/CategoryTabsBox/CategoryTabsBox";
import FeaturedTopics from "../../../components/HomePageComponents/FeaturedTopics/FeaturedTopics";
import TrustedByBest from "../../../components/HomePageComponents/TrustedByBest/TrustedByBest";
import HomeShowcaseCard from "../../../components/Cards/HomeShowcaseCard/HomeShowcaseCard";
import CourseCarouselComp from "../../../components/CarouselComponents/CourseCarouselComp/CourseCarouselComp";
import BannerComp from "../../../components/HomePageComponents/BannerComp/BannerComp";
import TabbedCourseCarouselComp from "../../../components/CarouselComponents/TabbedCourseCarouselComp/TabbedCourseCarouselComp";
import ReactLoading from "react-loading";
import {
    coursesData,
    det,
    det2,
    det3,
    bannerData,
    categoriesData,
} from "../../../fakedata/fakedata";

import css from "./LoggedInUserHomePage.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import instance from "../../../config/instance";
import { useDispatch } from "react-redux";
import { addUser } from "../../../service/redux/user";
import LOCAL_STORAGE from "../../../service/localStorage";

const LoggedInUserHomePage = () => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoading(true);
                const getAllCourse = await instance.get("courses");
                setCourses(getAllCourse.data.courses);
                setLoading(false);
            } catch (error) {
                setLoading(false);

                console.log(error);
            }
        };
        const fetchUser = async () => {
            try {
                const getUserProfile = await instance.get("profile/me");

                dispatch(addUser(getUserProfile.data.student));
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
        fetchdata();
    }, []);
    const rating = courses?.filter((courses) => courses.avgRating >= 4.8);
    const laris = courses?.filter((courses) => courses.numOfRatings >= 2);

    return (
        <>
            <Layout1>
                <VerticalCategoryMenuBar />
                <div className={css.ma}>
                    <div className={css.banner}>
                        <BannerComp bannerData={bannerData[0]} />
                    </div>
                    <h1 className={css.colTtl}>Pelajari kursus lainnya</h1>
                    {loading && (
                        <ReactLoading color="#306de4" width={64} height={64} />
                    )}
                    <div className={css.m1}>
                        {rating && (
                            <CourseCarouselComp
                                ttl="Rating Terbaik"
                                coursesData={rating}
                            />
                        )}
                    </div>
                    <div className={css.m1}>
                        {laris && (
                            <CourseCarouselComp
                                ttl="Paling Banyak di Ulas"
                                link="/"
                                coursesData={courses}
                            />
                        )}
                    </div>
                    <div className={css.m1}>
                        {courses && (
                            <CourseCarouselComp
                                ttl="Kursus Terpopuler"
                                link="/"
                                coursesData={courses}
                            />
                        )}
                    </div>
                    {/* <div className={css.m1}>
                        <TabbedCourseCarouselComp
                            ttl="Featured courses in"
                            link="/"
                            linkTxt=" React JS"
                            coursesData={coursesData}
                        />
                    </div>
                    <div className={css.m1}>
                        <CourseCarouselComp
                            ttl="New and noteworthy in Web Development"
                            link="/"
                            linkTxt="Web Development"
                            coursesData={coursesData}
                        />
                    </div>
                    <div className={css.m1}>
                        <CourseCarouselComp
                            ttl="Students are viewing"
                            coursesData={coursesData}
                        />
                    </div> */}
                </div>
            </Layout1>
        </>
    );
};

export default LoggedInUserHomePage;
