import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContext'
import { CountDownContext } from '../contexts/countDownContext'
import style from '../styles/componentes/ChallengeBox.module.css'

export function ChallengeBox() {
    
    const {activeChallenge, resetChallenge, completedChallenge} = useContext(ChallengesContext)
    const {resetCountDown} = useContext(CountDownContext)

    function handleChallengeSucceeded(){
        completedChallenge();
        resetCountDown();
    }

    function handleFailed(){
        resetChallenge();
        resetCountDown();

    }

    return (
        <div className={style.challengeBoxContiner}>
            {activeChallenge ? (
                <div className={style.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>

                    </main>

                    <footer>
                        <button type='button' 
                        className={style.challengeFailedButton}
                        onClick={handleFailed}
                        >Falhei</button>

                        <button type='button' 
                        className={style.challengeSucceededButton}
                        onClick={handleChallengeSucceeded}
                        >Completei</button>
                    </footer>
                </div>
            ) : (
                    <div className={style.challengeNotActive}>
                        <strong>finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level up" />
                    Avance de Level completando desafios.
                </p>
                    </div>
                )}


        </div>
    )
}