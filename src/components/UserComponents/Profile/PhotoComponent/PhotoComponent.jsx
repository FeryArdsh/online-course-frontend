import React, { useState } from "react";
import Swal from "sweetalert2";
import instance from "../../../../config/instance";

import Button1 from "../../../../utils/Buttons/Button1/Button1";
import UploadUtil from "../../../../utils/FormUtils/UploadUtil/UploadUtil";

import css from "./PhotoComponent.module.css";

const PhotoComponent = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleChangeImage = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => setImage(reader.result);
        setImage(reader.result);
    };
    const handleClickImage = async () => {
        try {
            const response = await instance.put(
                "http://localhost:5000/profile/me/img",
                {
                    image,
                }
            );
            await Swal.fire(response.data.message, "", "success");
            window.location.reload();
        } catch (error) {
            console.log(error);
            Swal.fire(error.data.message, "", "error");
        }
    };
    return (
        <div className={css.outerDiv}>
            <div className={css.imgBox}></div>
            <UploadUtil
                txt="Upload Image"
                accept={".png, .jpg, .jpeg"}
                onChange={handleChangeImage}
            />
            {file && <img src={file} alt="" className={css.profileImg} />}
            <Button1
                onClick={handleClickImage}
                txt="Save"
                color="var(--white)"
                bck="var(--light-gray2)"
                hovBck="var(--gray)"
                disableBtn={file ? false : true}
                extraCss={{
                    margin: "1rem 0",
                    fontSize: "1.1rem",
                    padding: "0.8rem 1.2rem",
                }}
            />
        </div>
    );
};

export default PhotoComponent;
