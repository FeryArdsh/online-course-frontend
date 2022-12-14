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

const LoggedInUserHomePage = () => {
    const [courses, setCourses] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const getAllCourse = await instance.get("courses");
                const getUserProfile = await instance.get("profile/me");

                dispatch(addUser(getUserProfile.data.student));
                setCourses(getAllCourse.data.courses);
            } catch (error) {
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
    console.log(courses);
    return (
        <>
            <Layout1>
                <VerticalCategoryMenuBar />
                <div className={css.ma}>
                    <div className={css.banner}>
                        <BannerComp bannerData={bannerData[2]} />
                    </div>
                    <div className={css.m1}>
                        <h1 className={css.colTtl}>What to learn next</h1>
                        <CourseCarouselComp
                            ttl="Rating Terbaik"
                            link="/"
                            coursesData={rating}
                        />
                    </div>
                    <div className={css.m1}>
                        <CourseCarouselComp
                            ttl="Recommended for you"
                            coursesData={coursesData}
                        />
                    </div>
                    <div className={css.m1}>
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
                    </div>
                </div>
            </Layout1>
        </>
    );
};

export default LoggedInUserHomePage;
