import React from "react";

import css from "./CourseReqComp.module.css";

const CourseReqComp = (props) => {
    return (
        <div className={css.outerDiv}>
            <div className={css.ttl}>Persyaratan</div>
            <ul className={css.ul}>
                {props?.data?.map((item, id) => {
                    return (
                        <li className={css.li} key={id}>
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CourseReqComp;
