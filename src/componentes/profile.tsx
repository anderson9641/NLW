import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContext'
import style from '../styles/componentes/Profile.module.css'


export function Profile(){

    const {level} = useContext(ChallengesContext)
    return(
        <div className={style.profileContainer}>
            <img src="https://github.com/diego3g.png" alt="Anderson" />
            <div>
                <strong>Anderson</strong>
                <p>
                    <img src='icons/level.svg' alt="level"/>
                    Level {level}</p>
            </div>
        </div>
    )
}