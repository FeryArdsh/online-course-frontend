import { useState } from "react";

import InputUtil from "../../../../utils/FormUtils/InputUtil/InputUtil";
import SelectUtil from "../../../../utils/FormUtils/SelectUtil/SelectUtil";
import TextEditorUtil from "../../../../utils/TextEditorUtil/TextEditorUtil";
import Button1 from "../../../../utils/Buttons/Button1/Button1";

import css from "./BasicSettingsComponent.module.css";
import { useSelector } from "react-redux";
import { addUser } from "../../../../service/redux/user";
import Swal from "sweetalert2";

const BasicSettingsComponent = () => {
    const [state, setState] = useState({
        name: "",
        headline: "",
        password: "",
    });
    const user = useSelector((state) => state.userData);

    let changeHanlder = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    let submitHandler = async () => {
        try {
            const { name, headline, password } = state;
            const response = await instance.put("profile/me", {
                ...(name && { name }),
                ...(headline && { headline }),
                ...(password && { password }),
            });
            dispatch(addUser(response.data));
            await Swal.fire({
                title: "Berhasil ubah data",
                icon: "success",
                timer: 2000,
            });
        } catch (error) {
            Swal.fire({
                title: "Terjadi Kesalahan",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
            console.log(error);
        }
    };
    return (
        <div className={css.outerDiv}>
            <div className={css.innerDiv}>
                <div className={css.box1}>
                    <InputUtil
                        label="Nama Lengkap"
                        name="name"
                        state={state.name}
                        placeholderTxt={user?.data?.name || ""}
                        onChange={changeHanlder}
                    />
                    <InputUtil
                        label="Headline"
                        name="headline"
                        state={state.headline}
                        placeholderTxt={
                            user?.data?.headline || "Buat headline Anda"
                        }
                        count={true}
                        countLimit={60}
                        onChange={changeHanlder}
                    />
                    <InputUtil
                        label="Password"
                        name="password"
                        type="password"
                        state={state.password}
                        placeholderTxt="Ubah password"
                        onChange={changeHanlder}
                    />
                    {/* <TextEditorUtil
                        label="Biography"
                        disclaimer="Your biography should have at least 50 characters, links and coupon codes are not permitted."
                        editorState={textEditorState}
                        setEditor={setTextEditorState}
                    />
                    <SelectUtil
                        label="Language"
                        value={options[0].txt}
                        options={options}
                    /> */}
                </div>
                {/* <div className={css.box2}>
                    <InputUtil
                        label="Website"
                        name="website"
                        placeholderTxt="URL"
                        disabledInpt={true}
                    />
                    <InputUtil
                        inptTxt="http://www.twitter.com/"
                        label="Twitter"
                        name="twitter"
                        placeholderTxt="Username"
                    />
                    <InputUtil
                        inptTxt="http://www.facebook.com/"
                        label="Facebook"
                        name="facebook"
                        placeholderTxt="Username"
                    />
                    <InputUtil
                        inptTxt="http://www.linkedin.com/"
                        label="LinkedIn"
                        name="linkedin"
                        placeholderTxt="Resource ID"
                    />
                    <InputUtil
                        inptTxt="http://www.youtube.com/"
                        label="Youtube"
                        name="youtube"
                        placeholderTxt="Username"
                    />
                </div> */}
            </div>
            <div className={css.bottomDiv}>
                <Button1
                    txt="Save"
                    color="var(--white)"
                    bck="var(--light-gray2)"
                    hovBck="var(--gray)"
                    onClick={submitHandler}
                    extraCss={{
                        margin: "1rem 0",
                        fontSize: "1.1rem",
                        padding: "0.8rem 1.2rem",
                    }}
                />
            </div>
        </div>
    );
};

export default BasicSettingsComponent;
