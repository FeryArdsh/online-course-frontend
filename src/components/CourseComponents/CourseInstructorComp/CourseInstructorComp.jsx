import { useState } from "react";

import { Link } from "react-router-dom";

import css from "./CourseInstructorComp.module.css";

import userprofileIcon from "/icons/userprofile.png";
import downArrowImg from "/icons/down-arrow.png";
import plyIcon from "/icons/play-button.png";
import certificateIcon from "/icons/medal.png";
import pplIcon from "/icons/people.png";
import bstarIcon from "/icons/bstar.png";

const CourseInstructorComp = (props) => {
    const [toggle, setToggle] = useState(false);

    const {
        studentID = {},
        aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehende",
        profession = "",
        courses = [],
        numberOfReviews = 0,
        avgRating = 0,
        numberOfStudent = 0,
        cmmt = "",
        link = "",
    } = props.data;

    const toggleHandler = () => {
        setToggle((prev) => !prev);
    };

    return (
        <div className={css.outerDiv} id={`author-${name}`}>
            <Link to={link} className={css.name}>
                {studentID.name}
            </Link>
            <div className={css.desc}>{profession}</div>
            <div className={css.topSec}>
                <div className={css.imgBox}>
                    <img
                        src={studentID?.imgProfil?.url}
                        alt="profile picture"
                        className={css.img}
                    />
                </div>
                <div className={css.det}>
                    <div className={css.udet}>
                        <img src={bstarIcon} alt="icon" className={css.icon} />{" "}
                        {avgRating}
                        <span className={css.udetTxt}>Rating Instructor</span>
                    </div>
                    <div className={css.udet}>
                        <img
                            src={certificateIcon}
                            alt="icon"
                            className={css.icon}
                        />
                        {numberOfReviews}
                        <span className={css.udetTxt}>Instructor Reviews</span>
                    </div>
                    <div className={css.udet}>
                        <img src={pplIcon} alt="icon" className={css.icon} />{" "}
                        {numberOfStudent}
                        <span className={css.udetTxt}>Instructor Students</span>
                    </div>
                    <div className={css.udet}>
                        <img src={plyIcon} alt="icon" className={css.icon} />{" "}
                        {courses.length}
                        <span className={css.udetTxt}>Instructor Courses</span>
                    </div>
                </div>
            </div>
            <div
                className={css.cmmt}
                style={{
                    height: toggle ? "max-content" : "200px",
                }}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehende
                <div className={css.coverup}></div>
            </div>
            <button className={css.btn} onClick={toggleHandler}>
                Show more
                <img
                    style={{ transform: toggle ? "rotate(180deg)" : "none" }}
                    src={downArrowImg}
                    alt="down arrow"
                    className={css.sicon}
                />
            </button>
        </div>
    );
};

export default CourseInstructorComp;
