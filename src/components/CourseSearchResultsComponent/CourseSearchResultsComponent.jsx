import { useEffect, useState } from "react";
import { useSearchParams, useParams, useMatch } from "react-router-dom";

import FiltersComp from "../CourseComponents/FiltersComp/FiltersComp";
import MedVerticalCourseCard from "../Cards/MedVerticalCourseCard/MedVerticalCourseCard";
import Button1 from "../../utils/Buttons/Button1/Button1";
import SelectBtnUtil from "../../utils/FormUtils/SelectBtnUtil/SelectBtnUtil";

import { courseDetData, filtersData } from "../../fakedata/fakedata.js";

import filterIcon from "/icons/filter.png";

import css from "./CourseSearchResultsComponent.module.css";
import instance from "../../config/instance";
import LoadingComp from "../LoadingComp";

const CourseSearchResultsComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categoryPage } = useParams();
    const match = useMatch("/courses/search");
    const options = ["Higest Rated", "Most Popular", "Newest"];
    const [selectedOption, setSelectedOption] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(false)

    const [courses, setCourses] = useState(null);
    const [courseFilter, setCourseFilter] = useState(null);
    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true)
            try {
                const response = await instance.get("courses");
                setCourses(response.data.courses);
                setLoading(false)

                // setCourseFilter(courses?.filter((e) => e.category === categoryPage));
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        };
        fetchCourse();
    }, []);

    const selectFunctionHandler = (value) => {
        if (value === "Higest Rated") {
            const oldState = [...courseFilter]
            const sorted = oldState.sort((a, b) => b.avgRating - a.avgRating);
            setCourseFilter(sorted)
        } else if (value === "Most Popular") {
            const oldState = [...courseFilter]
            const sorted = oldState.sort((a, b) => b.enrolled - a.enrolled);
            setCourseFilter(sorted)
        } else if (value === "Newest") {
            const oldState = [...courseFilter]
            const sorted = oldState.map(obj => {
                return { ...obj, date: new Date(obj.createdAt) }
            })
                .sort((a, b) => b.date - a.date)
            setCourseFilter(sorted)
        }
    };

    useEffect(() => {
        setCourseFilter(courses?.filter((e) => e.category === categoryPage));
    }, [categoryPage, courses]);

    return (
        <div className={css.outerDiv}>
            <div className={css.innerDiv}>
                <div className={css.TtlBox}>
                    {!match ? (
                        <div className={css.ttl}>
                            {/* All <span></span> courses */}
                        </div>
                    ) : (
                        <div className={css.ttl}>
                            <span>
                                {new Intl.NumberFormat("id-ID", {
                                    maximumSignificantDigits: 3,
                                }).format("10000")}
                            </span>
                            <span>results for</span>
                            <span>{searchParams.get("q") || null}</span>
                        </div>
                    )}
                </div>
                <div className={css.topBar}>
                    <div className={css.leftTopBar}>
                        <Button1
                            txt="Filters"
                            img={filterIcon}
                            onClick={() => setShowFilters((prev) => !prev)}
                            extraCss={{
                                padding: "1rem",
                                display: "flex",
                                justtifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                        <SelectBtnUtil
                            label="Sort by"
                            selectedOption={selectedOption}
                            options={options}
                            onChange={selectFunctionHandler}
                            extraCss={{ maxHeight: "55px" }}
                        />
                        <div
                            onClick={() => setSearchParams({})}
                            className={css.clAllTxt}
                        >
                            Hapus filter
                        </div>
                    </div>
                    <div className={css.rightTopBar}>
                        {new Intl.NumberFormat("id-ID", {
                            maximumSignificantDigits: 3,
                        }).format(courseFilter?.length)}
                        Hasil
                    </div>
                </div>
                <div
                    className={css.bdy}
                    style={{ gap: !showFilters ? "2rem" : "0" }}
                >
                    <div
                        className={[
                            css.leftBox,
                            showFilters ? css.leftBoxW : null,
                        ].join(" ")}
                    >
                        {filtersData?.map((item, id) => (
                            <div key={item.id}>
                                <hr />
                                <FiltersComp
                                    data={item}
                                    dropdownState={[0, 1].includes(id)}
                                    setcur={setCourses}
                                />
                            </div>
                        ))}
                        <hr />
                    </div>
                    <div
                        className={[
                            css.rightBox,
                            showFilters ? css.rightBoxW : null,
                        ].join(" ")}
                    >
                        {loading && <LoadingComp />}
                        {courseFilter?.map((item, i) => (
                            <MedVerticalCourseCard data={item} key={i} />
                        ))}
                        {courseFilter?.length === 0 && (
                            <span>Kursus Tidak Tersedia</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSearchResultsComponent;
