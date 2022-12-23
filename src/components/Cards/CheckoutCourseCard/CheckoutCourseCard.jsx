import React from "react";

import { Link } from "react-router-dom";

import TagUtil from "../../../utils/Tags/TAG1/TAG1";
import Button2 from "../../../utils/Buttons/Button2/Button2";

import css from "./CheckoutCourseCard.module.css";

import labelIcon from "/icons/label.png";
import ReactRating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCart } from "../../../service/redux/cart";

const CheckoutCourseCard = (props) => {
    const { data } = props;
    const {
        _id = 0,
        img = {},
        link = "/",
        ttl = "xxx",
        avgRating = 0,
        totalDuration = 0,
        level = "All",
        newPrc = 0,
        prc = 0,
        disc = 0,
        bestSeller = false,
        numOfRatings = 0,
        category = "",
    } = data;
    const dispatch = useDispatch();

    return (
        <Link className={css.outerDiv} to={link}>
            <div className={css.box1}>
                <div className={css.imgBox}>
                    <img
                        src={img.url}
                        alt="course thumbnail"
                        className={css.img}
                    />
                </div>
                <div className={css.det}>
                    <div className={css.ttl}>{ttl}</div>
                    {/* <div className={css.authors}>
                        By {authors?.join(", ")?.toString()}
                    </div> */}
                    <div className={css.ratings}>
                        {bestSeller ? <TagUtil /> : ""}
                        <div className={css.rats}>
                            <ReactRating
                                initialRating={avgRating}
                                readonly
                                emptySymbol={
                                    <AiOutlineStar size={15} color="orange" />
                                }
                                fullSymbol={
                                    <AiFillStar size={15} color="orange" />
                                }
                            />
                            <span className={css.num}>{avgRating}</span>
                            <span className={css.count}>({numOfRatings})</span>
                        </div>
                    </div>
                    <div className={css.crsDet}>
                        <span className={css.crsDet}>
                            {totalDuration} Menit
                        </span>
                        <span className={[css.crsDet, css.mid].join(" ")}>
                            Jenis Kategori {category}
                        </span>
                        <span className={css.crsDet}>
                            {level} Tingkat Kursus
                        </span>
                    </div>
                </div>
            </div>
            <div className={css.box23}>
                <div className={css.box3}>
                    <div className={css.priceDet}>
                        <div className={css.price}>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(newPrc)}
                        </div>
                        <img
                            src={labelIcon}
                            alt="price tag"
                            className={css.icon}
                        />
                        <div
                            className={css.box2}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(deleteCart(_id));
                            }}
                        >
                            <Button2
                                txt="Hapus"
                                hovBck="var(--light-orangish)"
                                extraCss={{
                                    fontWeight: "400",
                                    fontSize: "0.9rem",
                                    color: "red",
                                    margin: "0.2rem",
                                    padding: "2px",
                                }}
                            />
                        </div>
                    </div>
                    {disc >= 1 && (
                        <div className={css.dis}>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(prc)}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default CheckoutCourseCard;
