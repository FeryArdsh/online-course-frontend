import React from "react";
import { Link } from "react-router-dom";

import TAG1 from "../../../utils/Tags/TAG1/TAG1";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import CircleButton from "../../../utils/Buttons/CircleButton/CircleButton";

import css from "./CourseCard.module.css";

import heartIcon from "/icons/heart.png";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const CourseCard = (props) => {
    const {
        path = "/",
        img = "",
        ttl = "",
        desc = "",
        prc = 0,
        newPrc = 0,
        avgRating = 0,
        numOfRatings = 0,
        updatedDate = new Intl.DateTimeFormat("en-IN", {
            dateStyle: "long",
        }).format(new Date()),
        totalDuration = 0,
        level = "Beginner Level",
        crsSubtxt = "Python For Beginners : This course is meant for absolute beginners in programming or in python.",
    } = props?.data;

    const extraCss = props.extraCss;

    let addToCartHandler = () => {
        alert("Added to cart");
    };
    let addToWishListHandler = () => {
        alert("Added to wish list");
    };
    return (
        <>
            <div className={css.outerDiv} id={props.id} style={extraCss}>
                <Link className={css.innerDiv} to={path}>
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
                        <div className={css.authDet}>{totalDuration} menit</div>
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
                            <div className={css.rat1}>{avgRating}</div>
                            {/* <div className={css.rat2}>{avgRating}</div> */}
                            <div className={css.noOfRats}>({numOfRatings})</div>
                        </div>
                        <div className={css.prc}>
                            <span className={css.newPrc}>
                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(newPrc)}
                            </span>
                            {newPrc !== prc && (
                                <span className={css.oldPrc}>
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(prc)}
                                </span>
                            )}
                        </div>
                        <div className={css.tags}>
                            <TAG1 />
                        </div>
                    </div>
                </Link>
                <div className={css.hovCard}>
                    <div className={css.innerBox}>
                        <div className={css.ttl}>{ttl}</div>
                        <div className={css.btns}>
                            <Button1
                                onClick={addToCartHandler}
                                txt="Add to cart"
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
