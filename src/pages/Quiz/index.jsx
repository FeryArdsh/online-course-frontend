import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button1 from '../../utils/Buttons/Button1/Button1';
import css from "./index.module.css";


const Quiz = () => {
    const { id } = useParams()
    const [answer, setAnswer] = useState(null)
    const onSetAnswer = () => {

    }

    const submitHandler = () => {

    }
    return (
        <div className={css.container}>
            <h1>Ujian Kursus</h1>
            <ul className={css.listQues}>
                <li className={css.innerDiv}>
                    <h4>Apakah kamu tahu siapa pendiri microsoft Apakah kamu tahu siapa pendiri microsoft Apakah kamu tahu siapa pendiri microsoft?</h4>
                    <ul className={css.listQuesNone}>
                        <li className={css.option} onClick={onSetAnswer}>A. Mark zukberg</li>
                        <li className={css.option}>B. Sandiaga Uno</li>
                        <li className={css.option}>C. Fery Ardian Syah</li>
                        <li className={css.option}>D. Tidak</li>
                    </ul>
                </li>
            </ul>

            <Button1
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
            />
        </div>
    )
}

export default Quiz