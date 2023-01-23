import { useState } from "react";

import css from "./CourseHeaderComp.module.css";

import Button1 from "../../../utils/Buttons/Button1/Button1";
import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import CourseFloatingBuyCard from "../../Cards/CourseFloatingBuyCard/CourseFloatingBuyCard";

import captionIcon from "/icons/caption.png";
import globIcon from "/icons/globe.png";
import warningIcon from "/icons/warning.png";
import playIcon from "/icons/play.png";
import alarmIcon from "/icons/alarm.png";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const CourseHeaderComp = (props) => {
    const { setShareModal } = props;
    const { setVideoPrev } = props;
    const [scrolled, setScrolled] = useState(false);
    const [applyCoupon, setApplyCoupon] = useState(false);
    const [coupon, setCoupon] = useState("");

    const {
        img = {},
        ttl = "",
        desc = "",
        newPrc = 0,
        prc = 0,
        disc = 0,
        tmLeft = 0,
        avgRating = 0,
        numOfRatings = 0,
        enrolled = 0,
        createdBy = "",
        updatedAt = new Date(),
        lang = "English",
        subTtl = "English",
    } = props?.data;

    window.addEventListener("scroll", () => {
        if (document.body.scrollHeight - window?.pageYOffset <= 1026) {
            return setScrolled(false);
        }
        if (window?.pageYOffset >= 375) {
            return setScrolled(true);
        }

        setScrolled(false);
    });
    return (
        <div className={css.outerDiv}>
            <CourseFloatingBuyCard
                scrolled={scrolled}
                data={props?.data}
                setCoupon={setCoupon}
                applyCoupon={applyCoupon}
                setApplyCoupon={setApplyCoupon}
                setShareModal={setShareModal}
                setVideoPrev={setVideoPrev}
            />
            <div className={css.innerDiv}>
                <div className={css.leftDiv}>
                    <div className={css.ttl}>{ttl}</div>
                    <div className={css.desc}>{desc}</div>
                    <div className={css.rats}>
                        <ReactStars value={avgRating} size={16} edit={false} />
                        <div className={css.rating}>{avgRating}</div>
                        <div className={css.ratss}>({numOfRatings})</div>
                        <div className={css.enrolled}>{enrolled} terjual</div>
                    </div>
                    <div className={css.authors}>
                        Created by
                        <Link to="#">{createdBy?.studentID?.name}</Link>
                    </div>
                    <div className={css.det}>
                        <div className={css.lastUpdated}>
                            <img
                                src={warningIcon}
                                alt="warning icon"
                                className={css.icon}
                            />
                            Terakhir diperbarui
                            {" " + updatedAt.split("T")[0]}
                        </div>
                        {/* <div className={css.lang}>
                            <img
                                src={globIcon}
                                alt="warning icon"
                                className={css.icon}
                                style={{ filter: "invert(1)" }}
                            />
                            {lang}
                        </div>
                        <div className={css.subTtl}>
                            <img
                                src={captionIcon}
                                alt="warning icon"
                                className={css.icon}
                            />
                            {subTtl}
                        </div> */}
                    </div>
                    <div className={css.crsePmtDt}>
                        <div className={css.prcDet}>
                            <div className={css.prc}>
                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(newPrc)}
                            </div>
                            <div className={css.dscPrc}>
                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(prc)}
                            </div>
                            <div className={css.desc}>{disc}% off</div>
                        </div>
                        <div className={css.tmLeft}>
                            <img
                                src={alarmIcon}
                                alt="clock icon"
                                className={css.cicon}
                            />
                            <span>
                                <b>{tmLeft} hours</b> left at this price!
                            </span>
                        </div>
                        <Button1
                            txt="Add to cart"
                            color="var(--white)"
                            bck="var(--purple)"
                            hovBck="var(--purple-dark)"
                            extraCss={{ width: "100%", padding: "0.7rem" }}
                        />
                        <div className={css.crsePmtDtTxt}>
                            30-Day Money-Back Guarantee
                        </div>
                        <div className={css.crsePmtDtTxt}>
                            Full Lifetime Access
                        </div>
                        <div className={css.crsePmtDtExSec}>
                            <div
                                className={css.innCrsePmtDtExSec}
                                onClick={() => setShareModal((prev) => !prev)}
                            >
                                Share
                            </div>
                            <div className={css.innCrsePmtDtExSec}>
                                Gift this course
                            </div>
                            <div
                                className={css.innCrsePmtDtExSec}
                                onClick={() => setApplyCoupon((prev) => !prev)}
                            >
                                Apply the Coupon
                            </div>
                        </div>
                        <div className={css.inptBox}>
                            {applyCoupon ? (
                                <InputUtil
                                    btnTxt="Apply"
                                    onChange={(e) => setCoupon(e.target.value)}
                                    btnClick={() =>
                                        console.log(coupon, "coupon")
                                    }
                                    extraCss={{ height: "41px" }}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <div className={css.rightDiv}>
                    <div className={css.innRightDiv}>
                        <div className={css.imgBox}>
                            <img
                                src={img?.url}
                                alt="course thumbnail"
                                className={css.crsThumb}
                            />
                        </div>
                        <div className={css.maskDiv}></div>
                        <div className={css.imgMask}>
                            <div className={css.imgODiv}>
                                <img src={playIcon} className={css.imgIcon} />
                            </div>
                            <div className={css.maskTxt}>
                                Preview the course
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeaderComp;
