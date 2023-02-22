import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import LoadingComp from '../../components/LoadingComp';
import instance from '../../config/instance';
import Button1 from '../../utils/Buttons/Button1/Button1';
import css from "./index.module.css";
import { FaRegSadTear } from "react-icons/fa"

const Quiz = () => {
    const { id } = useParams()
    const [answer, setAnswer] = useState(["", "", "", "", ""])
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState(null);
    const [score, setScore] = useState(null);
    const navigate = useNavigate();

    const onSetAnswer = (ans, i) => {
        const value = [...answer]
        value[i] = ans
        setAnswer(value)
    }

    const submitHandler = async () => {
        if (answer.includes("")) {
            return Swal.fire("Semua Soal Harus Dijawab", "", "error")
        }
        try {
            const response = await instance.post("correct-quiz/" + id,
                answer
            );
            setScore(response.data.grade);
            if (response?.data?.grade <= 79) {
                Swal.fire(
                    {
                        title: `Skor : ${response.data.grade}`,
                        text: 'Maaf Kamu Belum Lulus',
                        icon: "error"
                    })
                return navigate("/course/view/" + id)
            }
        } catch (error) {
            console.log(error)
        }
        try {
            const responseCertificate = await instance.post("certificate/" + id);
            console.log(responseCertificate)
            await Swal.fire("Selamat Kamu Lulus", "Skor :" + responseCertificate?.data, "")
            navigate("/course/view/" + id)
        } catch (error) {
            await Swal.fire(error.response.data.message, "", "error")
            navigate("/course/view/" + id)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await instance.get("quiz/" + id);
                setCourse(response.data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
                return navigate("/user/profile/add-courses/draf");
            }
        };
        fetchData();
    }, [])

    return (
        <div className={css.container}>
            {!course ? <h2>Maaf Kursus Ini Tidak Memiliki Ujian</h2> : <h1>Ujian Kursus</h1>}
            {loading ? <LoadingComp /> :
                <ul className={css.listQues}>
                    {course?.question.map((e, i) => (
                        <li className={css.innerDiv} key={i}>
                            <h4>{e.title}</h4>
                            <ul className={css.listQuesNone}>
                                <li className={css.option} onClick={() => onSetAnswer("a", i)}>A. {e.a}</li>
                                <li className={css.option} onClick={() => onSetAnswer("b", i)}>B. {e.b}</li>
                                <li className={css.option} onClick={() => onSetAnswer("c", i)}>C. {e.c}</li>
                                <li className={css.option} onClick={() => onSetAnswer("d", i)}>D. {e.d}</li>
                            </ul>
                            <span className={css.theAnswer}>Jawaban : {answer[i].toUpperCase()}</span>
                        </li>
                    ))}
                </ul>
            }
            {course && <Button1
                txt="Kirim"
                color="var(--white)"
                bck="var(--primary)"
                hovBck="var(--primary-dark)"
                extraCss={{
                    width: "100%",
                    margin: "7px 0px",
                    border: "none",
                    padding: "1rem",
                }}
                onClick={submitHandler}
            />}
            <Link to={"/course/view/" + id}>
                Kembali
            </Link>
        </div>
    )
}

export default Quiz