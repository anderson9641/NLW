import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContext'
import style from '../styles/componentes/CompletedChallenges.module.css'

export function CompletedChallenges(){
    const {challengesCompleted} = useContext(ChallengesContext)

    return(
        <div className={style.completedChallengesCntainer}>
            <span>Tarefas Concluidas</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}