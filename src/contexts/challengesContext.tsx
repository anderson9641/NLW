import { ReactNode, useEffect } from 'react'
import { createContext, useState } from 'react'
import Challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../componentes/levelUpModal'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}



interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    startNewChallenge: () => void;
    levelUp: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))

    }, [level, currentExperience, challengesCompleted])


    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelModalOpen(true)
    }

    function closeModal(){
        setIsLevelModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * Challenges.length)
        const challenge = Challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp();
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(false)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider
            value={
                {
                    level,
                    currentExperience,
                    challengesCompleted,
                    activeChallenge,
                    experienceToNextLevel,
                    startNewChallenge,
                    levelUp,
                    resetChallenge,
                    completedChallenge,
                    closeModal
                }
            }>
            {children}

            {isLevelModalOpen && <LevelUpModal/>}

        </ChallengesContext.Provider>
    )
}

