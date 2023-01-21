import { useEffect, useState } from "react";

import Layout1 from "../../Layout1/Layout1";
import CategoryTabsBox from "../../../components/HomePageComponents/CategoryTabsBox/CategoryTabsBox";
import FeaturedTopics from "../../../components/HomePageComponents/FeaturedTopics/FeaturedTopics";
import TrustedByBest from "../../../components/HomePageComponents/TrustedByBest/TrustedByBest";
import HomeShowcaseCard from "../../../components/Cards/HomeShowcaseCard/HomeShowcaseCard";
import CourseCarouselComp from "../../../components/CarouselComponents/CourseCarouselComp/CourseCarouselComp";
import BannerCarouselComp from "../../../components/CarouselComponents/BannerCarouselComp/BannerCarouselComp";

import { det, det3 } from "../../../fakedata/fakedata";

import css from "./HomePage.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import instance from "../../../config/instance";
import LoadingComp from "../../../components/LoadingComp";

const HomePage = () => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categoryBoxData, setCategoryBoxData] = useState([
        {
            id: 1,
            tab: "Teknologi",
            ttl: "Perluas karir anda dengan mempelajari teknologi",
            btnLink: "/topic/python",
            desc: "Ilmu pengetahuan dan teknologi yang lebih biasa kita kenal singkatannya yaitu IPTEK. Hal ini merupakan yang paling pesat perkembangannya yang kita rasakan selama ini. Setiap detiknya ilmu ini terus mengalami perkembangan-perkembangan yang signifikan. IPTEK memiliki pengaruh yang sangat besar dalam kehidupan manusia pada saat sekarang ini.",
            btnTxt: "Teknologi",
            active: true,
            courses: [],
        },
        {
            id: 2,
            tab: "Bahasa",
            ttl: "Menambah skill bahasa kamu disini",
            btnLink: "/topic/excel",
            desc: "Sudah bukan rahasia lagi jika bahasa memudahkan setiap manusia berkomunikasi dengan manusia lainnya. Setiap daerah, bahkan negara bisa jadi punya bahasa berbeda-beda dan bukan tidak mungkin jika kita mempelajari bahasa dari negara lain.",
            btnTxt: "Bahasa",
            active: false,
            courses: [],
        },
    ]);

    let clickHandler = (id) => {
        setCategoryBoxData((prevData) =>
            prevData?.map((item) => {
                if (item?.id === id) {
                    item.active = true;
                    return item;
                }
                item.active = false;
                return item;
            })
        );
    };

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
        fetchdata();
    }, []);
    const teknologi = courses?.filter(
        (courses) => courses.category === "technology"
    );
    const language = courses?.filter(
        (courses) => courses.category === "language"
    );

    const sendData = categoryBoxData?.filter(
        (courses) => courses.active === true
    );

    const bestRating = courses?.filter((courses) => courses.avgRating >= 4);
    return (
        <>
            <Layout1>
                <div className={css.ma}>
                    <div className={css.banner}>
                        <BannerCarouselComp />
                    </div>
                    <div className={css.m1}>
                        <CategoryTabsBox
                            clickHandler={clickHandler}
                            title="Berbagai pilihan kursus"
                            desc="Pilih kursus sesuai dengan minat anda untuk bersaing pada dunia kerja"
                            data={categoryBoxData}
                            outerCss={{}}
                        >
                            {loading && <LoadingComp />}
                            {sendData[0].id === 1 ? (
                                <CourseCarouselComp coursesData={teknologi} />
                            ) : (
                                <CourseCarouselComp coursesData={language} />
                            )}
                        </CategoryTabsBox>
                    </div>
                    <div className={css.m1}>
                        <CourseCarouselComp
                            ttl="Lihat Rating Tertinggi"
                            coursesData={bestRating}
                        />
                    </div>
                </div>
                <FeaturedTopics />
                <HomeShowcaseCard det={det} />
                <TrustedByBest />
                {/* <HomeShowcaseCard det={det2} /> */}
                <HomeShowcaseCard det={det3} />
            </Layout1>
        </>
    );
};

export default HomePage;
