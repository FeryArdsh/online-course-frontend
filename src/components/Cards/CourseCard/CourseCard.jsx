import React from "react";
import { Link } from "react-router-dom";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import css from "./CourseCard.module.css";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../../service/redux/cart";
import Swal from "sweetalert2";

const CourseCard = (props) => {
    const {
        img = "",
        ttl = "",
        desc = "",
        prc = 0,
        newPrc = 0,
        avgRating = 0,
        numOfRatings = 0,
        totalDuration = 0,
    } = props?.data;
    const cart = useSelector((state) => state.cartData.cart);
    const courseTaken = useSelector((state) => state.userData.data.coursesTaken);
    const dispatch = useDispatch();
    const extraCss = props.extraCss;

    let addToCartHandler = () => {
        const findId = cart.find((item) => item._id === props?.data?._id);
        if (findId) {
            return Swal.fire("Kursus sudah ada", "", "error");
        }
        if (courseTaken.includes(props?.data?._id)) {
            return Swal.fire("Kamu sudah membeli kursus ini", "", "error");
        }
        dispatch(addCart(props?.data));
        Swal.fire("Berhasil menambah kursus", "", "success");
    };
    return (
        <>
            <div className={css.outerDiv} id={props.id} style={extraCss}>
                <Link
                    className={css.innerDiv}
                    to={`/course/${props?.data?._id}`}
                >
                    <div className={css.imgBox}>
                        <img
                            src={img.url}
                            alt="course thumbnail"
                            className={css.courseImg}
                        />
                    </div>
                    <div className={css.cardBdy}>
                        <div className={css.ttl}>{ttl}</div>
                        <div className={css.authDet}>{desc}</div>
                        <div className={css.authDet} style={{ color: "black" }}>{totalDuration} menit</div>
                        <div className={css.stats}>
                            <Rating
                                initialRating={avgRating}
                                readonly
                                emptySymbol={
                                    <AiOutlineStar size={15} color="orange" />
                                }
                                fullSymbol={
                                    <AiFillStar size={15} color="orange" />
                                }
                            />
                            <div className={css.rat1}>{avgRating.toFixed(1)}</div>
                            {/* <div className={css.rat2}>{avgRating}</div> */}
                            <div className={css.noOfRats}>({numOfRatings})</div>
                        </div>
                        <div className={css.prc}>
                            {
                                newPrc === 0 ? <span className={css.gratis}>GRATIS</span> : <span className={css.newPrc}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(newPrc)}
                                </span>
                            }

                            {newPrc !== prc && (
                                <span className={css.oldPrc}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(prc)}
                                </span>
                            )}
                        </div>
                        {/* <div className={css.tags}>
                            <TAG1 />
                        </div> */}
                    </div>
                </Link>
                <div className={css.hovCard}>
                    <div className={css.innerBox}>
                        <div className={css.ttl}>{ttl}</div>
                        <div className={css.btns}>
                            <Button1
                                onClick={addToCartHandler}
                                txt="Tambah ke Keranjang"
                                color="#fff"
                                bck="var(--primary)"
                                hovBck="var(--primary-dark)"
                                extraCss={{ width: "100%", border: "none" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseCard;
