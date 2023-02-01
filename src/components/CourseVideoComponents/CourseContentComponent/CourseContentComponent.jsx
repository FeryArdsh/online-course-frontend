import { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import card3 from "/images/certificate.png"
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { RiLock2Fill } from "react-icons/ri"
import { exportComponentAsPNG } from 'react-component-export-image';
// import closeIcon from "/icons/close.png";
// import playIcon from "/icons/play-button.png";
// import downArrowIcon from "/icons/down-arrow.svg";
// import openFolderIcon from "/icons/open-folder.png";

import css from "./CourseContentComponent.module.css";
import ButtonQuiz from "../../../utils/Buttons/ButtonQuiz";
import instance from "../../../config/instance";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import Swal from "sweetalert2";
import { useRef } from "react";

const CourseContentComponent = (props) => {
    const { title = "", data = [], paramId = "" } = props;
    const [toggleBox, setToggleBox] = useState({});
    const [titleVid, setTitleVid] = useState("");
    const [urlVideo, setUrlVideo] = useState("");
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const certificateWrapper = useRef()

    const onSetUrl = (subItem) => {
        setUrlVideo(subItem.url);
        setTitleVid(subItem.title);
    };

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const getUser = await instance.get("profile/me");
                setUser(getUser.data.student);
            } catch (error) {
                console.log(error);
            }
        };
        fetchdata();
    }, [])

    const isCertificate = user?.certificate?.find((e) => e.idCourse === paramId)
    const onDownloadCerti = async () => {
        if (!name) {
            return Swal.fire({
                title: "Nama Harus Diisi",
                timer: 1500,
                icon: "info"
            })
        }
        exportComponentAsPNG(certificateWrapper, {
            html2CanvasOptions: { backgroundColor: null }
        })
        try {
            const getUser = await instance.post("download/" + paramId);
            console.log(getUser)
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }

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


                        {isCertificate ?
                            <>
                                <p style={{ color: "red" }}>*Gunakan nama kamu dengan benar</p>
                                <p style={{ color: "red" }}>*Perhatikan bahwa kamu hanya dapat download sertifikat ini satu kali</p>
                                <div className={css.openSertificate} ref={certificateWrapper}>
                                    <img className={css.imgSer} src={card3} alt="Sertifikat" />
                                    <span className={css.nameSertificate}>{name.toUpperCase()}</span>
                                    <span className={css.ttlSertificate}>{title}</span>
                                </div>
                                <input type="text" placeholder="Masukkan Nama Anda" className={css.inputName} onChange={(e) => setName(e.target.value)} />
                                {isCertificate?.isGraduate ? <Button1 txt="Kamu Sudah Mendownload Sertifikat Ini"
                                    color="var(--white)"
                                    bck="gray"
                                    hovBck="gray"
                                    extraCss={{
                                        width: "50%",
                                        margin: "7px 0px",
                                        border: "none",
                                        padding: "1rem",
                                    }}
                                    disableBtn={true}
                                /> : <Button1 txt="Download Sertifikat"
                                    color="var(--white)"
                                    bck="var(--primary)"
                                    hovBck="var(--primary-dark)"
                                    extraCss={{
                                        width: "50%",
                                        margin: "7px 0px",
                                        border: "none",
                                        padding: "1rem",
                                    }}
                                    onClick={onDownloadCerti}
                                />}

                            </>
                            :
                            <div className={css.sertificate}>
                                <img className={css.imgSer} src={card3} alt="Sertifikat" />
                                <span className={css.lockSer}>
                                    <RiLock2Fill size={50} />
                                    <h5>Selesaikan Ujian untuk Mendapatkan Sertifikat</h5>
                                </span>
                            </div>
                        }
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
