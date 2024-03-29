import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import instance from "../../../config/instance";
import css from "./index.module.css";
import storage from "../../../config/firebaseConf";
import {
    ref,
    getStorage,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";
import StepAddCourse from "../../StepAddCourse";

const AddDraftCourse = () => {
    const [data, setData] = useState({
        ttl: "",
        desc: "",
        fullDesc: "",
        level: "",
        category: "",
        prc: 0,
        img: "",
        videoPromotion: "",
        courseRequirements: [
            {
                text: "",
            },
        ],
    });
    const [progresspercent, setProgresspercent] = useState(0)
    const navigate = useNavigate();

    const changeImg = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setData({ ...data, img: reader.result });
        };
    };
    let handleChange = (i, e) => {
        let newFormValues = {
            ...data,
        };
        newFormValues.courseRequirements[i][e.target.name] = e.target.value;
        setData(newFormValues);
    };

    let addFormFields = () => {
        setData({
            ...data,
            courseRequirements: [...data.courseRequirements, { text: "" }],
        });
    };

    let removeFormFields = (i) => {
        let newFormValues = { ...data };
        newFormValues.courseRequirements.splice(i, 1);
        setData(newFormValues);
    };

    const changeHanlder = (e) => {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requirment = data.courseRequirements.map((item) => item.text);
        console.log(data)
        try {
            const response = await instance.post("course", {
                ...data,
                courseRequirements: requirment,
            });
            console.log(response);
            await Swal.fire("Berhasil", "", "success");
            navigate(
                "/user/profile/add-courses/" + response?.data?.course?._id
            );
        } catch (error) {
            Swal.fire("Error", "", "error");
            console.log(error);
        }
    };

    const submitVideoTest = async (e) => {
        const videoFile = e.target.files[0];
        const storageRef = ref(
            storage,
            `videos/${Date.now()}-${videoFile.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, videoFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgresspercent(uploadProgress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setData((prev) => ({ ...prev, videoPromotion: downloadURL }))
                });
            }
        );
    };

    return (
        <div>
            <StepAddCourse number={1} />
            <h2 style={{ textAlign: "center" }}>Tambah Kursus Baru Anda</h2>
            <hr />
            <form className={css.containerDraf} onSubmit={handleSubmit}>
                <label htmlFor="ttl">Title</label>
                <input
                    className={css.input}
                    type="text"
                    name="ttl"
                    onChange={changeHanlder}
                    required
                />
                {/* ============= */}
                <label htmlFor="desc">Deskripsi Singkat</label>
                <input
                    className={css.input}
                    type="text"
                    name="desc"
                    onChange={changeHanlder}
                    required
                />
                {/* ============= */}
                <label htmlFor="fullDesc">Deskripsi Lengkap</label>
                <textarea
                    className={css.input}
                    name="fullDesc"
                    id=""
                    cols="30"
                    rows="10"
                    onChange={changeHanlder}
                    required
                ></textarea>
                {/* ============= */}
                <label htmlFor="level">Tingkat</label>
                <select
                    className={css.input}
                    name="level"
                    id="level"
                    onChange={changeHanlder}
                    required
                >
                    <option value="">---Pilih Tingkat---</option>
                    <option value="all">Semua Tingkat</option>
                    <option value="pemula">Pemula</option>
                    <option value="menengah">Menengah</option>
                    <option value="ahli">Ahli</option>
                </select>
                {/* ============= */}
                <label htmlFor="category">Category</label>
                <select
                    className={css.input}
                    name="category"
                    id="category"
                    onChange={changeHanlder}
                    required
                >
                    <option value="">---Pilih Kategori---</option>
                    <option value="technology">Teknologi</option>
                    <option value="business">Bisnis</option>
                    <option value="language">Bahasa</option>
                    <option value="healty">Kesehatan</option>
                    <option value="hobby">Hobi</option>
                </select>
                {/* ============= */}
                <label htmlFor="prc">Harga</label>
                <input
                    className={css.input}
                    type="text"
                    placeholder="Dalam rupiah, Contoh 45000"
                    name="prc"
                    onChange={changeHanlder}
                    required
                />
                <span style={{ color: "green", marginTop: "-10px", marginBottom: "10px" }}>*Untuk memberi kursus gratis masukkan angka 0 "nol"</span>
                {/* ============= */}
                <div className={css.contFile}>
                    <span className={css.outerFile}>
                        <label htmlFor="img">Gambar Promosi</label>
                        <input className={css.inputFile} type="file" name="img" onChange={changeImg} required />
                    </span>
                    {/* ============= */}
                    <span className={css.outerFile}>
                        <label>Video Promosi</label>
                        <input
                            className={css.inputFile}
                            type="file"
                            name="video"
                            accept="video/mp4,video/x-m4v,video/*"
                            required
                            onChange={submitVideoTest}
                        />
                    </span>
                </div>
                {progresspercent >= 1 &&
                    progresspercent <= 99 && (
                        <progress
                            id="progress-bar"
                            value={progresspercent}
                            max="100"
                        ></progress>
                    )}
                {/* ============= */}

                <label htmlFor="courseRequirements">Syarat Kursus</label>
                {data?.courseRequirements.map((item, i) => (
                    <div key={i}>
                        <input
                            className={css.input}
                            type="text"
                            name="text"
                            placeholder={"Syarat ke " + (i + 1)}
                            onChange={(e) => handleChange(i, e)}
                            required
                        />
                        {i ? (
                            <button
                                type="button"
                                onClick={() => removeFormFields(i)}
                            >
                                Remove
                            </button>
                        ) : null}
                    </div>
                ))}
                <button className={css.addReqCourse} type="button" onClick={addFormFields}>
                    Tambah Syarat
                </button>
                <button type="submit" className={css.submit}>Lanjut</button>
            </form>
        </div>
    );
};

export default AddDraftCourse;
