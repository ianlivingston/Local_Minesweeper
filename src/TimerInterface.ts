import type {StateCreator} from "zustand";

export interface TimerInterface {
    timerMS: number,
    digitE2: number,
    digitE1: number,
    digitE0: number,
    resetTimer: () => void,
    enableTimer: () => void,
    disableTimer: () => void,
    publishGame: () => void,
    update: () => void,
}

const Timer: StateCreator<TimerInterface, [], [], TimerInterface> = (set, get) => {
    let offset: number = 0;
    let intervalID: ReturnType<typeof setInterval> | undefined

    return ({
        timerMS: 0,
        digitE2: 0,
        digitE1: 0,
        digitE0: 0,
        resetTimer: () => {
            get().disableTimer()
            set(() => ({
                timerMS: 0,
                digitE2: 0,
                digitE1: 0,
                digitE0: 0,
            }))
        },
        enableTimer: () => {
            if(intervalID !== undefined) return

            offset = performance.now()
            intervalID = setInterval(get().update, 10)
        },
        disableTimer: () => {
            clearInterval(intervalID)
            intervalID = undefined
        },
        publishGame: () => 0,
        update: () => {
            const timerMS = performance.now() - offset
            if(timerMS < 1_000_000){
                set(() => ({
                    timerMS,
                    digitE2: Math.trunc(timerMS / 100_000 % 10),
                    digitE1: Math.trunc(timerMS / 10_000 % 10),
                    digitE0: Math.trunc(timerMS / 1_000 % 10),
                }))
            }
        },
    })
}

export default Timer;