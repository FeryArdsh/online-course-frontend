import css from "./UploadUtil.module.css";

const UploadUtil = (props) => {
    const {
        txt = "Upload",
        name = "uploadbtn",
        onChange,
        ...extraProps
    } = props;
    return (
        <div className={css.outerDiv}>
            <label htmlFor={name} className={css.uploadLabel} {...extraProps}>
                <span className={css.lblTxt}>No file Selected</span>
                <span className={css.txt}>{txt}</span>
            </label>
            <input
                onChange={onChange}
                type="file"
                name={name}
                id={name}
                accept={extraProps.accept}
                className={css.uploadBtn}
            />
        </div>
    );
};

export default UploadUtil;
