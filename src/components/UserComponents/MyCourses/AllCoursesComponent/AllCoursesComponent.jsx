import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InputUtil from "../../../../utils/FormUtils/InputUtil/InputUtil";
import SelectDropdownUtil from "../../../../utils/FormUtils/SelectDropdownUtil/SelectDropdownUtil";
import CourseCardWithOptions from "../../../Cards/CourseCardWithOptions/CourseCardWithOptions";

import searchIcon from "/icons/search.png";
import shareIcon from "/icons/share.png";
import starIcon from "/icons/star-b.png";
import plusIcon from "/icons/plus.png";
import folderIcon from "/icons/folder.png";
import { courseDataWithOptions } from "../../../../fakedata/fakedata";

import css from "./AllCoursesComponent.module.css";
import instance from "../../../../config/instance";
import LOCAL_STORAGE from "../../../../service/localStorage";
import LoadingComp from "../../../LoadingComp";

const AllCoursesComponent = () => {
    const [course, setCourse] = useState(null);
    const [filters, setFilers] = useState({
        sortBy: {},
        filterByCategory: {},
        filterByState: {},
        filterByInstructor: {},
    });
    const [loading, setLoading] = useState(false);

    const [resetBtn, setRestBtn] = useState(false);

    const sortByOptions = [
        {
            key: "Recently Accessed",
            value: "recently accessed",
        },
        {
            key: "Recently Enrolled",
            value: "recently enrolled",
        },
        {
            key: "Title: A-to-Z",
            value: "a-z",
        },
        {
            key: "Title: Z-to-A",
            value: "z-a",
        },
    ];

    const filterByCategoryOptions = [
        [
            {
                key: "Favourites",
                value: "favorites",
            },
        ],
        [
            {
                key: "All Categories",
                value: "all categories",
            },
            {
                key: "Development",
                value: "development",
            },
            {
                key: "IT & Software",
                value: "it software",
            },
            {
                key: "Business",
                value: "business",
            },
            {
                key: "Marketing",
                value: "marketing",
            },
        ],
        [
            {
                key: "Archived",
                value: "archived",
            },
        ],
    ];

    const filterByStateOptions = [
        {
            key: "Completed",
            value: "completed",
        },
        {
            key: "In Progress",
            value: "in progress",
        },
        {
            key: "Not Started",
            value: "not started",
        },
    ];

    const filterByInstructorOptions = [
        {
            key: "Aaron Wheeler",
            value: "aaron wheeler",
        },
        {
            key: "Koushil Mankali",
            value: "koushil",
        },
    ];

    useEffect(() => {
        if (
            Object.keys(filters.sortBy).length ||
            Object.keys(filters.filterByCategory).length ||
            Object.keys(filters.filterByState).length ||
            Object.keys(filters.filterByInstructor).length
        ) {
            return setRestBtn(true);
        }
        setRestBtn(false);
    }, [filters]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const getCourseTaken = await instance.get("student/taken");
                setCourse(getCourseTaken.data.student.coursesTaken);
                // const getUserProfile = await instance.get("profile/me", {
                //     headers: {
                //         "x-auth-token": LOCAL_STORAGE.getDataUser().token,
                //     },
                // });
                // setCourse(getUserProfile.data.student.coursesTaken);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const resetFiltersHandler = () => {
        setFilers({
            sortBy: {},
            filterByCategory: {},
            filterByState: {},
            filterByInstructor: {},
        });
    };

    const optionsComps = [
        <div className={css.opt}>
            <div className={css.httl}>Lists</div>
            <Link to="/" className={css.ctxt}>
                Dynamics
            </Link>
            <Link to="/" className={css.ctxt}>
                NCloud
            </Link>
        </div>,
        <div className={css.opt}>
            <Link to="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={shareIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Share</span>
            </Link>
            <Link to="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={plusIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Create New List</span>
            </Link>
            <Link to="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={starIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Favorite</span>
            </Link>
            <Link to="/" className={css.txtBox}>
                <span className={css.iconBox}>
                    <img src={folderIcon} alt="icon" className={css.icon} />
                </span>
                <span className={css.txt}>Unarchive</span>
            </Link>
        </div>,
    ];
    return (
        <div className={css.outerDiv}>
            <div className={css.topBar}>
                {/* <div className={css.filters}>
          <SelectDropdownUtil
            id="filter1"
            label="Sort by"
            filterType="sortBy"
            defaultValue={sortByOptions[0]}
            value={filters.sortBy}
            setValue={setFilers}
            multipleOptions={false}
            options={sortByOptions}
          />
          <SelectDropdownUtil
            id="filter2"
            label="Filter by"
            filterType="filterByCategory"
            defaultValue={filterByCategoryOptions[0][0]}
            value={filters.filterByCategory}
            setValue={setFilers}
            multipleOptions={true}
            options={filterByCategoryOptions}
          />
          <SelectDropdownUtil
            id="filter3"
            filterType="filterByState"
            defaultValue={filterByStateOptions[0]}
            value={filters.filterByState}
            setValue={setFilers}
            multipleOptions={false}
            options={filterByStateOptions}
          />
          <SelectDropdownUtil
            id="filter4"
            filterType="filterByInstructor"
            defaultValue={filterByInstructorOptions[0]}
            value={filters.filterByInstructor}
            setValue={setFilers}
            multipleOptions={false}
            options={filterByInstructorOptions}
          />
          <div
            className={[css.rstBtn, resetBtn ? css.activeRstBtn : ""].join(" ")}
            onClick={resetFiltersHandler}
          >
            Reset
          </div>
        </div> */}

                {/* <div className={css.searchBar}>
                    <InputUtil
                        icon={searchIcon}
                        iconPosition="right"
                        placeholderTxt="Search my courses"
                        extraCss={{ padding: "0.3rem", fontSize: "1rem" }}
                    />
                </div> */}
            </div>
            <div className={css.bdy}>
                {loading && (
                    <LoadingComp />
                )}
                {
                    course?.length === 0 && <div className={css.outerEmpty}>
                        <h4 className={css.emptyCourse}>Kursus Kamu belum ada nih!!!</h4>
                        <br />
                        <span className={css.emptyLink}>Yuk <Link to="/">beli</Link> kursus terlebih dahulu </span>
                    </div>
                }
                {course?.map((item, inde) => {
                    return (
                        <CourseCardWithOptions
                            key={inde}
                            data={item}
                            isOptions={true}
                            options={optionsComps}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AllCoursesComponent;
