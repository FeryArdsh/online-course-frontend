import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlanModalUtil from "../../../utils/Modals/PlanModalUtil/PlanModalUtil";

import css from "./CourseCardWithOptions.module.css";

import playIcon from "/icons/play-button.png";
import dotsIcon from "/icons/dots.png";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import instance from "../../../config/instance";
import Swal from "sweetalert2";

const CourseCardWithOptions = (props) => {
    const { isOptions = false, options, data } = props;
    const [modal, setModal] = useState(false);
    const [rate, setRate] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const {
        path = "",
        img = {},
        _id = 0,
        ttl = "",
        author = "",
        rating = 0,
        courseCoveredPercent = 0,
    } = data;
    const [menuBox, setMenuBox] = useState(false);

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target.id !== `cwo-${_id}`) {
                return setMenuBox(false);
            }
        });

        return () => {
            window.removeEventListener("click", (e) => {
                if (e.target.id !== `cwo-${_id}`) {
                    return setMenuBox(false);
                }
            });
        };
    }, []);

    const handleChangeComment = (e) => {
        setReviewText(e.target.value);
    };
    const onSubmitRating = async () => {
        try {
            const response = await instance.post(`course/${_id}/reviews`, {
                reviewText,
                rating: rate,
            });
            console.log(response);
            Swal.fire("Berhasil memberikan rating", "", "success");
        } catch (error) {
            console.log(error);
            Swal.fire(error?.response?.data?.message, "", "error");
        }
        setModal(false);
    };

    const content = (
        <>
            <h3 className={css.mHeader}>Beri Rating Pada Kursus Ini</h3>
            <p className={css.mtxt}>Pilih Rating</p>
            <div className={css.stars}>
                <Rating
                    onClick={setRate}
                    initialRating={rate}
                    emptySymbol={<AiOutlineStar size={40} color="black" />}
                    fullSymbol={<AiFillStar size={40} color="orange" />}
                />
            </div>
            <label>Tambahkan Komentar Anda :</label>
            <textarea
                onChange={handleChangeComment}
                className={css.textarea}
                name="comment"
                cols="50"
                rows="10"
            ></textarea>
            <Button1
                onClick={onSubmitRating}
                txt="Kirim"
                bck="var(--primary)"
                hovBck="var(--primary-dark)"
                extraCss={{
                    width: "100%",
                    margin: "1rem 0",
                    padding: "1rem",
                    border: "none",
                    color: "var(--white)",
                }}
            />
        </>
    );

    const modalHandler = (e) => {
        e.preventDefault();
        setModal((prev) => !prev);
    };

    return (
        <>
            {modal ? (
                <PlanModalUtil setModal={setModal} content={content} />
            ) : null}
            <Link to={`/course/view/${_id}`} className={css.outerDiv}>
                {isOptions ? (
                    <div
                        className={css.optionsBox}
                        onClickCapture={(e) => e.preventDefault()}
                    >
                        <button
                            id={`cwo-${_id}`}
                            type="button"
                            className={css.menuBtn}
                            onClick={() => setMenuBox((prev) => !prev)}
                        >
                            <img
                                src={dotsIcon}
                                className={css.menuIcon}
                                id={`cwo-${_id}`}
                            />
                            {menuBox ? (
                                <div className={css.menuBox}>
                                    {options?.map((Option, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={css.optionComp}
                                            >
                                                {Option}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : null}
                        </button>
                    </div>
                ) : null}
                <div className={css.imgBox}>
                    <img src={img.url} alt="course image" className={css.img} />
                    <div className={css.hovImgBox}>
                        <img
                            src={playIcon}
                            alt="play icon"
                            className={css.hovImg}
                        />
                    </div>
                </div>
                <div className={css.bdy}>
                    <div className={css.ttl}>{ttl}</div>
                    <div className={css.author}>{author}</div>
                    {/* <progress
                        value={76}
                        max="100"
                        className={css.progressBar}
                    /> */}
                    <div className={css.footerBox}>
                        {/* <span className={css.txt}>
                            {courseCoveredPercent}% complete
                        </span> */}
                        <span className={css.txt}>Lanjut belajar</span>
                        <span className={css.starsRatings}>
                            <span></span>
                            <span onClick={modalHandler}>Leave a rating</span>
                        </span>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default CourseCardWithOptions;
