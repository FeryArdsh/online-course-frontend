import { useState } from "react";

import css from "./FeaturedReviewComp.module.css";

import CircleButton from "../../../utils/Buttons/CircleButton/CircleButton";

import TimeSinceFunc from "../../../helpers/TimeSinceFunc.js";

import userprofileIcon from "/icons/userprofile.png";
import thumbsdownIcon from "/icons/dislike.png";
import thumbsupIcon from "/icons/like.png";
import ReactStars from "react-stars";

const FeaturedReviewComp = (props) => {
    const initObj = {
        liked: false,
        disliked: false,
    };
    const [liked, setLiked] = useState(initObj);

    const {
        profileImg = userprofileIcon,
        name = "",
        courses = 0,
        reviews = 0,
        rating = 0,
        createdAt = "",
        reviewText = "",
    } = props.data;

    let likeHandler = (target) => {
        setLiked((prev) => {
            return { ...initObj, [target]: !prev[target] };
        });
    };

    return (
        <div className={css.outerDiv}>
            <div className={css.topSec}>
                <div className={css.imgBox}>
                    <img
                        src={profileImg}
                        alt="profile picture"
                        className={css.img}
                    />
                </div>
                <div className={css.det}>
                    <div className={css.name}>{name}</div>
                    {/* <div className={css.udet}>{courses} courses</div>
                    <div className={css.udet}>{reviews} reviews</div> */}
                </div>
            </div>
            <div className={css.rats}>
                <ReactStars value={rating.toFixed()} size={16} edit={false} />

                <span className={css.stars}>{rating} nilai rating</span>
                <span className={css.tme}>{TimeSinceFunc(createdAt)}</span>
            </div>
            <div className={css.cmmt}>{reviewText}</div>
            <div className={css.feedback}>
                <div className={css.fbkTxt}>
                    {liked.liked || liked.disliked
                        ? "Thank you for your feedback"
                        : "Was this review helpful?"}
                </div>
                <div className={css.fbkBox}>
                    <div className={css.btns}>
                        <CircleButton
                            img={thumbsupIcon}
                            extraCss={{
                                borderRadius: "50%",
                                ...{
                                    backgroundColor: liked.liked ? "black" : "",
                                },
                            }}
                            imageCss={{
                                width: "16px",
                                height: "16px",
                                ...{ filter: liked.liked ? "invert(1)" : "" },
                            }}
                            onClick={() => likeHandler("liked")}
                        />
                        <CircleButton
                            img={thumbsdownIcon}
                            extraCss={{
                                borderRadius: "50%",
                                ...{
                                    backgroundColor: liked.disliked
                                        ? "black"
                                        : "",
                                },
                            }}
                            imageCss={{
                                width: "16px",
                                height: "16px",
                                ...{
                                    filter: liked.disliked ? "invert(1)" : "",
                                },
                            }}
                            onClick={() => likeHandler("disliked")}
                        />
                    </div>
                    <div className={css.rpt}>Report</div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedReviewComp;
