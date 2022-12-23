import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import Tag from "../../../utils/Tags/TAG1/TAG1";

import css from "./MedVerticalCourseCard.module.css";

const MedVerticalCourseCard = (props) => {
    const {
        _id = 0,
        img = {},
        ttl = "",
        desc = "",
        author = "",
        lastUpdated = "11-02-2022",
        totalDuration = 0,
        lectures = 0,
        level = "",
        avgRating = 0,
        numOfRatings = 0,
        tag = "",
        newPrc = 0,
        prc = 0,
    } = props?.data;

    return (
        <div className={css.outerDiv}>
            <Link to={`/course/` + _id} className={css.innerDiv}>
                <div className={css.imgBox}>
                    <img className={css.img} src={img.url} alt="course image" />
                </div>
                <div className={css.detBox}>
                    <div className={css.leftDetBox}>
                        <div className={css.ttl}>{ttl}</div>
                        <div className={css.desc}>{desc}</div>
                        <div className={css.author}>{author}</div>
                        <div className={css.det}>
                            <span className={css.updated}>
                                {/* Updated <div>{new Date(lastUpdated)}</div> */}
                            </span>
                            <span className={css.inDet}>
                                <span>{totalDuration} menit</span>
                                <span>{lectures} video</span>
                                <span>{level} level</span>
                            </span>
                        </div>
                        <div className={css.rats}>
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
                            <div className={css.rat}>{avgRating}</div>
                            <div className={css.cnt}>({numOfRatings})</div>
                            {/* <Tag
                                txt={tag}
                                extraCss={{
                                    backgroundColor: "var(--light-orangish)",
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className={css.rightDetBox}>
                        <div className={css.prc}>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(newPrc)}
                        </div>
                        <div className={css.oPrc}>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(prc)}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MedVerticalCourseCard;
