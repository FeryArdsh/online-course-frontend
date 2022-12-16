import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../config/instance";
import storage from "../../../config/firebaseConf";
import {
    ref,
    getStorage,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";
import Swal from "sweetalert2";

const AddCourse = () => {
    const { id } = useParams();
    const [videoUrl, setVideoUrl] = useState(null);
    const [durVid, setDurVid] = useState(null);
    const [progresspercent, setProgresspercent] = useState(100);
    const [course, setCourse] = useState(null);
    const [datavideo, setDatavideo] = useState([
        {
            section: "",
            video: [],
        },
    ]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get("course/" + id);
            setCourse(response.data.course);
        };
        fetchData();
    }, []);

    // ================== Section =====================
    const handleClickAddSection = () => {
        setDatavideo([...datavideo, { section: "", video: [] }]);
    };
    const handleClickDeleteSection = (e, i) => {
        const state = [...datavideo];
        state.splice(1, 1);
        setDatavideo(state);
    };
    const onChangeSection = (e, i) => {
        const value = e.target.value;
        const state = [...datavideo];
        state[i].section = value;
        setDatavideo(state);
    };
    // ================== Section =====================

    // ================== Video =====================
    const handleClickAddVideo = (e, i) => {
        const state = [...datavideo];
        state[i].video.push({ title: "", duration: "", url: "" });
        setDatavideo(state);
    };
    const handleClickDeleteVideo = (e, iSection, iVideo) => {
        const state = [...datavideo];
        state[iSection].video.splice(iVideo, 1);
        setDatavideo(state);
    };
    const onChangeVideoTitle = (e, iSection, iVideo) => {
        const value = e.target.value;
        const state = [...datavideo];
        state[iSection].video[iVideo].title = value;
        setDatavideo(state);
    };
    // ================== Video =====================

    const submitVideoTest = async (e, iSection, iVideo) => {
        const videoFile = e.target.files[0];
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const media = new Audio(reader.result);
                media.onloadedmetadata = () => {
                    const state = [...datavideo];
                    state[iSection].video[iVideo].duration = Math.floor(
                        media.duration / 60
                    );
                    resolve(setDatavideo(state));
                };
            };
            reader.readAsDataURL(videoFile);
            reader.onerror = (error) => reject(error);
        });

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
                    const state = [...datavideo];
                    state[iSection].video[iVideo].url = downloadURL;
                    setDatavideo(state);
                });
            }
        );
    };

    const onSubmitVideo = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post(
                `course/${id}/videos`,
                datavideo
            );
            await Swal.fire("Berhasil publish course", "", "success");
            navigate("/user/profile/courses");
            console.log(response);
        } catch (error) {
            await Swal.fire("Error submit data", "", "error");
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Tambah Video Kursus</h2>
            <hr />
            <h3>{course?.ttl}</h3>
            <form onSubmit={onSubmitVideo}>
                {datavideo.map((item, i) => (
                    <div key={i}>
                        <h4>Title Section</h4>
                        <input
                            type="text"
                            name="section"
                            required
                            onChange={(e) => onChangeSection(e, i)}
                        />
                        {i === 0 ? (
                            <button
                                type="button"
                                onClick={handleClickAddSection}
                            >
                                <AiOutlinePlusCircle />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={(e) => handleClickDeleteSection(e, i)}
                            >
                                <AiFillDelete />
                            </button>
                        )}
                        <br />
                        <div>
                            {item.video.map((vid, iVideo) => (
                                <div key={iVideo}>
                                    <h6>Video</h6>
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            handleClickDeleteVideo(e, i, iVideo)
                                        }
                                    >
                                        <AiFillDelete />
                                    </button>
                                    <input
                                        type="text"
                                        name="vidtitle"
                                        required
                                        placeholder="Judul Video"
                                        onChange={(e) =>
                                            onChangeVideoTitle(e, i, iVideo)
                                        }
                                    />
                                    <br />
                                    <input
                                        type="file"
                                        name="video"
                                        accept="video/mp4,video/x-m4v,video/*"
                                        required
                                        onChange={(e) =>
                                            submitVideoTest(e, i, iVideo)
                                        }
                                    />
                                    <br />
                                    {progresspercent >= 1 &&
                                        progresspercent <= 99 && (
                                            <progress
                                                id="progress-bar"
                                                value={progresspercent}
                                                max="100"
                                            ></progress>
                                        )}
                                </div>
                            ))}
                            <br />
                            <button
                                type="button"
                                onClick={(e) => handleClickAddVideo(e, i)}
                            >
                                <AiOutlinePlusCircle />
                                Tambah Video
                            </button>
                        </div>
                        <br />
                        <br />
                    </div>
                ))}
                <button type="submit">Simpan dan Publish</button>
            </form>
        </div>
    );
};

export default AddCourse;
