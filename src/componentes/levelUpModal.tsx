import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContext'
import style from '../styles/componentes/LevelUpModal.module.css'

export function LevelUpModal(){

    const {level, closeModal}= useContext(ChallengesContext)

    return (
        <div className={style.overlay}>
            <div className={style.container}>

                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançõu um novo level!</p>

                <button type='button' onClick={closeModal}>
                    <img src="/icons/close.svg" alt="fechar modal" />
                </button>

            </div>
        </div >
    )
}