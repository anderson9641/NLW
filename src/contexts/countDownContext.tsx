import { ReactNode } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Children } from 'react'
import {createContext} from 'react'
import { ChallengesContext } from './challengesContext';

interface CountDownContextDate{
    minutes: number;
    seconds: number;
    hasFinish: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountDownProviderProps{
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextDate)

let countdownTimeout: NodeJS.Timeout;

export function CountDownProvider({children} : CountDownProviderProps){

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsAvtive] = useState(false)
    const [hasFinish, setHasFinish] = useState(false)

    const {startNewChallenge} = useContext(ChallengesContext);

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountDown() {
        setIsAvtive(true)
    }

    function resetCountDown() {
        clearTimeout(countdownTimeout)
        setIsAvtive(false)
        setTime(0.1 * 60)
        setHasFinish(false)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinish(true)
            setIsAvtive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return(
        <CountDownContext.Provider 
        value={
            {
                minutes,
                seconds,
                hasFinish,
                isActive,
                startCountDown,
                resetCountDown
            }
        }>
            {children}
        </CountDownContext.Provider>
    )
}