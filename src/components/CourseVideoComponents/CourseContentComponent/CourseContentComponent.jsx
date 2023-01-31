import { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import card3 from "/images/card3.jpg"
import CustomCheckboxUtil from "../../../utils/FormUtils/CustomCheckboxUtil/CustomCheckboxUtil";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { RiLock2Fill } from "react-icons/ri"
// import closeIcon from "/icons/close.png";
// import playIcon from "/icons/play-button.png";
// import downArrowIcon from "/icons/down-arrow.svg";
// import openFolderIcon from "/icons/open-folder.png";

import css from "./CourseContentComponent.module.css";
import ButtonQuiz from "../../../utils/Buttons/ButtonQuiz";

const CourseContentComponent = (props) => {
    const { title = "", data = [], paramId = "" } = props;
    const [toggleBox, setToggleBox] = useState({});
    const [titleVid, setTitleVid] = useState("");
    const [urlVideo, setUrlVideo] = useState("");

    const onSetUrl = (subItem) => {
        setUrlVideo(subItem.url);
        setTitleVid(subItem.title);
    };

    return (
        <div className={css.outterDiv}>
            <div className={css.innerDiv}>
                <div className={css.titleBox}>
                    <span className={css.ttl}>{title}</span>
                    <Link to="/" className={css.imgBox}>
                        {/* <img
                            src={closeIcon}
                            alt="close icon"
                            className={css.closeIcon}
                        /> */}
                        Home
                    </Link>
                </div>
                <div className={css.bdy}>
                    <div className={css.vid}>
                        {urlVideo &&
                            <VideoPlayer src={urlVideo} />
                        }
                        <h4 className={css.ttlSer}>SERTIFIKAT</h4>
                        <div className={css.sertificate}>
                            <img className={css.imgSer} src={card3} alt="Sertifikat" />
                            <span className={css.lockSer}>
                                <RiLock2Fill size={50} />
                                <h5>Selesaikan Ujian untuk Mendapatkan Sertifikat</h5>
                            </span>
                        </div>
                    </div>
                    <div className={css.conTab}>
                        {titleVid ?
                            <h3 className={css.ttlVid}>{titleVid}</h3> : <h3 className={css.ttlVid}>Pilih Video</h3>
                        }
                        {data?.map((item, id) => {
                            return (
                                <div className={css.tab} key={`tab-${id}`}>
                                    <div
                                        className={css.tabTitleBox}
                                        onClick={() =>
                                            setToggleBox((p) => {
                                                return { ...p, [id]: !p[id] };
                                            })
                                        }
                                    >
                                        <div className={css.tabTitleLeft}>
                                            <div className={css.tabTtl}>{`Section ${id + 1
                                                }: ${item.section}`}</div>
                                            <div className={css.tabDesc}>
                                                <span>
                                                    {item?.video?.length} Video
                                                </span>
                                                <span></span>
                                                <span>
                                                    {item.sectionDuration} min
                                                </span>
                                            </div>
                                        </div>
                                        <div className={css.tabTitleRight}>
                                            <IoIosArrowDown />
                                            {/* <img
                                            src={downArrowIcon}
                                            alt="down arrow"
                                            className={[
                                                css.icon,
                                                toggleBox[id]
                                                    ? css.iconReverse
                                                    : null,
                                            ].join(" ")}
                                        /> */}
                                        </div>
                                    </div>
                                    {toggleBox[id] ? (
                                        <Link to="" className={css.tabBdy}>
                                            {item.video?.map((subItem, i) => {
                                                return (
                                                    <div
                                                        className={css.descBdy}
                                                        key={`subItem-${i}`}
                                                        onClick={() =>
                                                            onSetUrl(subItem)
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                css.descBdyLeft
                                                            }
                                                        >
                                                            {/* <CustomCheckboxUtil
                                                            extraCss={{
                                                                width: "40px",
                                                                gap: "0",
                                                                margin: "0.5rem",
                                                            }}
                                                        /> */}
                                                            -
                                                        </div>
                                                        <div
                                                            className={
                                                                css.descBdyRight
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    css.sbTtl
                                                                }
                                                            >
                                                                {subItem.title}
                                                            </div>
                                                            <div
                                                                className={
                                                                    css.sbBox
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        css.subDur
                                                                    }
                                                                >
                                                                    <AiFillPlayCircle />
                                                                    <span
                                                                        className={
                                                                            css.subDurTxt
                                                                        }
                                                                    >
                                                                        {
                                                                            subItem.duration
                                                                        }{" "}
                                                                        min
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </Link>
                                    ) : null}
                                </div>
                            );
                        })}
                        <Link to={"/quiz/" + paramId} className={css.linkQuiz}>
                            <ButtonQuiz />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContentComponent;
