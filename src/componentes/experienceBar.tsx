import { useContext } from 'react';
import { ChallengesContext } from '../contexts/challengesContext';
import style from '../styles/componentes/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

    return (
        <header className={style.experienceBar}>
            <span>0 px</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span
                    className={style.currentExperience}
                    style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience}xp
                </span>
            </div>
            <span>{experienceToNextLevel}xp</span>
        </header>
    );

}