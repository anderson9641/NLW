import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContext'
import style from '../styles/componentes/Profile.module.css'


export function Profile(){

    const {level} = useContext(ChallengesContext)
    return(
        <div className={style.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/59017890?s=460&amp;u=3e80204f2b1ab56b85d91d62bd5931919a04567f&amp;v=4" alt="Anderson" />

            <div>
                <strong>Anderson</strong>
                <p>
                    <img src='icons/level.svg' alt="level"/>
                    Level {level}</p>
            </div>
        </div>
    )
}