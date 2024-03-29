import { useState } from "react";

import css from "./CourseFloatingBuyCard.module.css";

import Button1 from "../../../utils/Buttons/Button1/Button1";
import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";

import alarmIcon from "/icons/alarm.png";
import playIcon from "/icons/play.png";
import heartIcon from "/icons/heart.png";
import { AiOutlineShareAlt } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../../service/redux/cart";
import { useNavigate } from "react-router-dom";

const CourseFloatingBuyCard = (props) => {
    const {
        img = {},
        ttl = "xxxx",
        desc = "xxxx",
        newPrc = 0,
        discPrice = 0,
        disc = 0,
        tmLeft = 0,
        rating = 0,
        rats = 0,
        enrolled = 0,
        authors = ["xxx", "yyy"],
        lastUpdated = new Date(),
        lang = "English",
        subTtl = "English",
    } = props?.data;
    const cart = useSelector((state) => state.cartData.cart);
    const courseTaken = useSelector((state) => state.userData.data.coursesTaken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { scrolled, setCoupon, applyCoupon, setApplyCoupon, setShareModal, setVideoPrev } =
        props;

    const styleGuide = {
        display: "none",
    };

    const outStyleGuide = {
        position: "fixed",
        top: 0,
        right: "7%",
    };
    let addToCartHandler = () => {
        const findId = cart.find((item) => item._id === props?.data?._id);
        if (findId) {
            return Swal.fire("Kursus sudah ada", "", "error");
        }
        if (courseTaken.includes(props?.data?._id)) {
            Swal.fire("Kamu sudah membeli kursus ini", "", "error")
            return navigate("/user/my-courses/learning")
        }
        dispatch(addCart(props?.data));
        Swal.fire("Berhasil menambah kursus", "", "success");
        navigate("/cart");
    };
    return (
        <div className={css.outerDiv} style={scrolled ? outStyleGuide : {}}>
            <div className={css.innRightDiv} style={scrolled ? styleGuide : {}}>
                <div className={css.imgBox}>
                    <img
                        src={img.url}
                        alt="course thumbnail"
                        className={css.crsThumb}
                    />
                </div>
                <div className={css.maskDiv}></div>
                <div className={css.imgMask} onClick={() => setVideoPrev((prev) => !prev)}>
                    <div className={css.imgODiv}>
                        <img src={playIcon} className={css.imgIcon} />
                    </div>
                    <div className={css.maskTxt}>Lihat Pratinjau Kursus</div>
                </div>
            </div>
            <div className={css.crsePmtDt}>
                <div className={css.prcDet}>
                    <div className={css.prc}>
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(newPrc)}
                    </div>
                    {disc >= 1 && (
                        <>
                            <div className={css.dscPrc}>
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(discPrice)}
                            </div>
                            <div className={css.desc}>{disc}% off</div>
                        </>
                    )}
                </div>
                {/* <div className={css.tmLeft}>
                    <img
                        src={alarmIcon}
                        alt="clock icon"
                        className={css.cicon}
                    />
                    <span>
                        <b>{tmLeft} hours</b> left at this price!
                    </span>
                </div> */}
                <div className={css.btns}>
                    <div className={css.btnsSec1}>
                        <Button1
                            onClick={addToCartHandler}
                            txt="Beli Sekarang"
                            color="var(--white)"
                            bck="var(--primary)"
                            hovBck="var(--primary-dark)"
                            extraCss={{
                                width: "100%",
                                padding: "0.7rem",
                                margin: "0",
                                border: "1px solid var(--primary)",
                            }}
                        />
                        {/* <Button1
                            txt={null}
                            img={heartIcon}
                            extraCss={{
                                width: "15%",
                                margin: "0",
                                padding: "0.7rem",
                            }}
                        /> */}
                    </div>
                    {/* <div className={css.btnsSec2}>
                        <Button1
                            txt="Buy now"
                            extraCss={{
                                width: "100%",
                                padding: "0.7rem",
                                margin: "0.5rem 0",
                            }}
                        />
                    </div> */}
                </div>
                <div className={css.crsePmtDtTxt}>
                    Sertifikat Penyelesaiian
                </div>
                <div className={css.crsePmtDtTxt}>Akses Kursus Selamanya</div>
                <div className={css.crsePmtDtExSec}>
                    <div
                        className={css.innCrsePmtDtExSec}
                        onClick={() => setShareModal((prev) => !prev)}
                    >
                        Bagikan Kursus
                        <AiOutlineShareAlt size={24} />
                    </div>
                    {/* <div className={css.innCrsePmtDtExSec}>
                        Gift this course
                    </div>
                    <div
                        className={css.innCrsePmtDtExSec}
                        onClick={() => setApplyCoupon((prev) => !prev)}
                    >
                        Apply the Coupon
                    </div> */}
                </div>
                <div className={css.inptBox}>
                    {applyCoupon ? (
                        <InputUtil
                            btnTxt="Apply"
                            onChange={(e) => setCoupon(e.target.value)}
                            btnClick={() => console.log(coupon, "coupon")}
                            extraCss={{ height: "42px" }}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <hr />
            {/* <div className={css.footerSec}>
                <div className={css.fooTtl}>Training 5 or more people?</div>
                <div className={css.fooDesc}>
                    Get your team access to 17,000+ top Udemy courses anytime,
                    anywhere.
                </div>
                <Button1
                    txt="Try Udemy Business"
                    extraCss={{ width: "100%", padding: "0.7rem", margin: 0 }}
                />
            </div> */}
        </div>
    );
};

export default CourseFloatingBuyCard;
