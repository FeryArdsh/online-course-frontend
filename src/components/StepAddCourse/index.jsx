import React from 'react'
import css from "./index.module.css"

const StepAddCourse = ({ number }) => {
    return (
        <div className={css.container}>
            <div className={css.innerDiv}>
                {number === 1 && (<>
                    <span className={css.active}>1</span>
                    <span className={css.noActive}>2</span>
                    <span className={css.noActive}>3</span>
                </>)}
                {number === 2 && (<>
                    <span className={css.done}>1</span>
                    <span className={css.active}>2</span>
                    <span className={css.noActive}>3</span>
                </>)}
                {number === 3 && (<>
                    <span className={css.done}>1</span>
                    <span className={css.done}>2</span>
                    <span className={css.active}>3</span>
                </>)}
            </div>
        </div>
    )
}

export default StepAddCourse