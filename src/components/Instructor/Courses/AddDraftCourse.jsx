import React, { useState } from "react";
import css from "./index.module.css";

const AddDraftCourse = () => {
    const [data, setData] = useState({
        ttl: "",
        desc: "",
        fullDesc: "",
        level: "",
        category: "",
        prc: 0,
        img: "",
        courseRequirements: [
            {
                text: "",
            },
        ],
    });

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
        console.log(data);
    };

    return (
        <div>
            <form className={css.containerDraf} onSubmit={handleSubmit}>
                <label htmlFor="ttl">Title</label>
                <input
                    type="text"
                    name="ttl"
                    onChange={changeHanlder}
                    required
                />
                {/* ============= */}
                <label htmlFor="desc">Deskripsi Singkat</label>
                <input
                    type="text"
                    name="desc"
                    onChange={changeHanlder}
                    required
                />
                {/* ============= */}
                <label htmlFor="fullDesc">Deskripsi Lengkap</label>
                <textarea
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
                    type="text"
                    placeholder="Dalam rupiah, Contoh 45000"
                    name="prc"
                    onChange={changeHanlder}
                    required
                />
                {/* ============= */}
                <label htmlFor="img">Gambar Promosi</label>
                <input
                    type="file"
                    name="img"
                    onChange={changeHanlder}
                    required
                />
                {/* ============= */}
                <label htmlFor="courseRequirements">Syarat Kursus</label>
                {data?.courseRequirements.map((item, i) => (
                    <div key={i}>
                        <input
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
                <button type="button" onClick={addFormFields}>
                    Add
                </button>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AddDraftCourse;
