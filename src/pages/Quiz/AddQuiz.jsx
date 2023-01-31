import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StepAddCourse from '../../components/StepAddCourse'
import Button1 from '../../utils/Buttons/Button1/Button1'
import css from "./index.module.css"
import { AiOutlineCheckCircle } from "react-icons/ai"
import instance from '../../config/instance'
import LoadingComp from '../../components/LoadingComp'
import Swal from 'sweetalert2'

const AddQuiz = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState(null);
    const [quizz, setQuizz] = useState([
        {
            title: "",
            a: "",
            b: "",
            c: "",
            d: "",
            correct: ""
        },
        {
            title: "",
            a: "",
            b: "",
            c: "",
            d: "",
            correct: ""
        },
        {
            title: "",
            a: "",
            b: "",
            c: "",
            d: "",
            correct: ""
        }
        , {
            title: "",
            a: "",
            b: "",
            c: "",
            d: "",
            correct: ""
        }, {
            title: "",
            a: "",
            b: "",
            c: "",
            d: "",
            correct: ""
        }
    ])
    const question = [1, 2, 3, 4, 5]
    const answer = ["A", "B", "C", "D"]
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(quizz);
    }

    const onChangeTitle = (e, index) => {
        const value = e.target.value
        const state = [...quizz]
        state[index].title = value;
        setQuizz(state);
    }

    const onChangeAnswer = (event, e, index, i) => {
        const value = event.target.value;
        const optionAnswer = e.toLowerCase()

        const newArray = quizz.map((item, indexx) => {
            if (indexx === index) {
                return { ...item, [optionAnswer]: value }
            } else {
                return item
            }
        })
        setQuizz(newArray)
    }

    const onCorrect = (e, index, i) => {
        const optionAnswer = e.target.value.toLowerCase()
        const state = [...quizz]
        state[index].correct = optionAnswer;
        setQuizz(state);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await instance.get("quiz/" + id);
                setCourse(response);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (course?.data !== null && course?.data !== undefined) {
            Swal.fire("Ujian Sudah Dibuat", "", "info")
            return navigate("/user/profile/courses");
        }
    }, [course])

    return (
        <div>
            <StepAddCourse number={3} />
            <h2 style={{ textAlign: "center" }}>Tambah Ujian Kursus</h2>
            <hr />
            {
                loading && <LoadingComp />
            }
            <form className={css.containerDraf} onSubmit={handleSubmit}>
                <ol type="1">
                    {question.map((element, index) => (
                        <li key={index} className={css.listQues}>
                            <input
                                className={css.input}
                                type="text"
                                name="title"
                                placeholder={"Soal No. " + element}
                                onChange={(e) => onChangeTitle(e, index)}
                                required
                            />
                            <ol type='A' className={css.optionAns}>
                                {answer.map((e, i) => (
                                    <li key={i} className={css.answerInput}>
                                        <input
                                            className={css.input}
                                            type="text"
                                            name={element + index + e + i}
                                            placeholder={'Pilihan Jawaban ' + e}
                                            onChange={(event) => onChangeAnswer(event, e, index, i)}
                                            required
                                        />
                                        <label>
                                            <input type="radio" id={element + index + e + i} name={index} value={e} required onChange={(event) => onCorrect(event, index, i)}></input>
                                            <span>
                                                <AiOutlineCheckCircle size={24} />
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ol>
                        </li>
                    ))}

                </ol>
                <Button1
                    txt="Simpan dan Publish"
                    color="var(--white)"
                    bck="var(--primary)"
                    hovBck="var(--primary-dark)"
                    extraCss={{
                        width: "100%",
                        margin: "7px 0px",
                        border: "none",
                        padding: "10px 2px",
                    }}
                />
            </form>
        </div>
    )
}

export default AddQuiz