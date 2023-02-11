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
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addCart } from "../../../service/redux/cart";

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
    const cart = useSelector((state) => state.cartData.cart);
    const courseTaken = useSelector((state) => state.userData.data.coursesTaken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                        <Link to="#" style={{ color: "black" }}>{createdBy?.studentID?.name}</Link>
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
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(newPrc)}
                            </div>
                            {/* <div className={css.dscPrc}>
                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(prc)}
                            </div> */}
                        </div>
                        <Button1
                            onClick={addToCartHandler}
                            txt="Beli Sekarang"
                            color="var(--white)"
                            bck="var(--primary)"
                            hovBck="var(--purple-dark)"
                            extraCss={{ width: "100%", padding: "0.7rem" }}
                        />
                        <div className={css.crsePmtDtTxt}>
                            Sertifikat Penyelesaiian
                        </div>
                        <div className={css.crsePmtDtTxt}>
                            Akses Kursus Selamanya
                        </div>
                        <div className={css.crsePmtDtExSec}>
                            <div
                                className={css.innCrsePmtDtExSec}
                                onClick={() => setShareModal((prev) => !prev)}
                            >
                                Bagikan Kursus
                                <AiOutlineShareAlt size={24} />
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
                        <div className={css.imgMask} onClick={() => setVideoPrev((prev) => !prev)}>
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
