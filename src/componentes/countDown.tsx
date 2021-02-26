import { useContext, useEffect, useState } from 'react'
import style from '../styles/componentes/CountDown.module.css'
import {ChallengesContext} from '../contexts/challengesContext'
import {CountDownContext} from '../contexts/countDownContext'



export function CountDown() {
    const {
        minutes,
        seconds, 
        hasFinish, 
        isActive, 
        resetCountDown,
        startCountDown
    } = useContext(CountDownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    

    return (

        <div>
            <div className={style.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinish ? (
                <button disabled
                className={style.countDownButton}>
                    Ciclo Encerrado
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button type="button" className={`${style.countDownButton} ${style.countDownButtonActive}`}
                                onClick={resetCountDown}>
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button type="button" className={style.countDownButton}
                                    onClick={startCountDown}>
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )}
        </div>

    )
}