import { createPortal } from "react-dom";

import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import CircleButton from "../../../utils/Buttons/CircleButton/CircleButton";

import css from "./ShareCourseCard.module.css";

import fbIcon from "/icons/socialMedia/facebook.png";
import twIcon from "/icons/socialMedia/twitter.png";
import mlIcon from "/icons/socialMedia/email.png";
import closeIcon from "/icons/close.png";
import { Link } from "react-router-dom";

const ShareCourseCard = (props) => {
    const {
        ttl = "",
        txt = "",
        btnTxt = "",
        btnClick = () => {},
        closeModal = () => {},
    } = props;

    let shareHandler = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Copied!");
        return closeModal();
    };

    return createPortal(
        <div className={css.outerDiv}>
            <div className={css.innerDiv}>
                <div className={css.box1}>
                    <div className={css.ttl}>{ttl}</div>
                    <img
                        src={closeIcon}
                        onClick={closeModal}
                        className={css.icon}
                    />
                </div>
                <div className={css.box2}>
                    <InputUtil
                        state={txt}
                        btnTxt={btnTxt}
                        btnClick={shareHandler}
                        btnCss={{ padding: "18px", backgroundColor: "blue" }}
                    />
                </div>
                <div className={css.box3}>
                    <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        className={css.icons}
                    >
                        <CircleButton img={fbIcon} />
                    </a>
                    <a
                        href="https://www.twitter.com/"
                        target="_blank"
                        className={css.icons}
                    >
                        <CircleButton img={twIcon} />
                    </a>
                    <a
                        href="https://www.gmail.com/"
                        target="_blank"
                        className={css.icons}
                    >
                        <CircleButton img={mlIcon} />
                    </a>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default ShareCourseCard;
