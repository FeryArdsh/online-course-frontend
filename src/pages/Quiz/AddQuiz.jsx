import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import StepAddCourse from '../../components/StepAddCourse'
import Button1 from '../../utils/Buttons/Button1/Button1'
import css from "./index.module.css"
import { AiOutlineCheckCircle } from "react-icons/ai"

const AddQuiz = () => {
    const { id } = useParams()
    const [quizz, setQuizz] = useState([
        {
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
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Wauuuuu");
    }
    const changeHanlder = (e, index) => {
        console.log(e.target.value)
        console.log(index);
    }

    const onCorrect = (e) => {
        console.log(e.target.style.color = "green")
    }
    return (
        <div>
            <StepAddCourse number={3} />
            <h2 style={{ textAlign: "center" }}>Tambah Ujian Kursus</h2>
            <hr />
            <form className={css.containerDraf} onSubmit={handleSubmit}>
                <ol type="1">
                    {question.map((element, index) => (
                        <li key={index} className={css.listQues}>
                            <input
                                className={css.input}
                                type="text"
                                name="ttl"
                                placeholder={"Soal No. " + element}
                                onChange={(e) => changeHanlder(e, index)}
                                required
                            />
                            <ol type='A' className={css.optionAns}>
                                {answer.map((e, i) => (
                                    <li key={i} className={css.answerInput}>
                                        <label htmlFor="">
                                            <input
                                                className={css.input}
                                                type="text"
                                                name={i}
                                                placeholder={'Pilihan Jawaban ' + e}
                                                onChange={changeHanlder}
                                                required
                                            />
                                        </label>
                                        <input type="radio" id="html" name="ans" value="HTML"></input>
                                        {/* <button className={css.correct} type="button" onClick={onCorrect}><AiOutlineCheckCircle size={24} /></button> */}
                                    </li>
                                ))}

                            </ol>
                        </li>
                    ))}

                </ol>
                <Button1
                    txt="Login"
                    color="var(--white)"
                    bck="var(--primary)"
                    hovBck="var(--primary-dark)"
                    extraCss={{
                        width: "100%",
                        margin: "7px 0px",
                        border: "none",
                        padding: "1rem",
                    }}
                />
                <select>
                    <option value="A">Apple</option>
                    <option value="B">Banana</option>
                    <option value="C">Cranberry</option>
                </select>
            </form>
        </div>
    )
}

export default AddQuiz