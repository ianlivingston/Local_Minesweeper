import useStore from './StateStore.ts'
import Tile from './Tile.tsx'
import type {difficulty} from "./StateStore.ts"
import {type ChangeEvent, type MouseEvent, type CSSProperties, useState} from "react";
import trophyUrl from './assets/trophy-winner-prize-svgrepo-com.svg'
import skullUrl from './assets/skull-crossbones-svgrepo-com.svg'
import './Game.css'
import NavBar from "./NavBar.tsx";

function Game() {
    const board = useStore((state) => state.board)
    const uncoverTile = useStore((state) => state.uncoverTile)
    const strobe = useStore((state) => state.strobe)
    const init = useStore((state) => state.initializeGame)
    const setFlag = useStore((state) => state.setTileIsFlagged)
    const numberOfColumns = useStore((state) => state.boardDimX)

    const digitE2 = useStore((state) => state.digitE2)
    const digitE1 = useStore((state) => state.digitE1)
    const digitE0 = useStore((state) => state.digitE0)
    const resetTimer = useStore((state) => state.resetTimer)
    const gameState = useStore((state) => state.gameState)

    const [level, setLevel] = useState<difficulty>("Easy")

    const changeLevel = (e: ChangeEvent) => {
        //@ts-expect-error: value isn't on target
        setLevel(e.target.value)
    }

    return (
        <>
            <NavBar />
            <main className="game">
                <div id="LevelSelect">
                    <div className="game-controls">
                        <select onChange={changeLevel} value={level}>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <button id="startButton" onClick={() => {
                            init(level)
                            resetTimer()
                        }}>
                            Start
                        </button>
                    </div>
                    <div className="timer-area">
                        {gameState === "won" && (
                            <img src={trophyUrl} alt="You won" className="result-icon" />
                        )}
                        {gameState === "lost" && (
                            <img src={skullUrl} alt="You lost" className="result-icon" />
                        )}
                        <div className="timer-display" aria-label="Elapsed time">
                            <span className="timer-digit">{digitE2}</span>
                            <span className="timer-digit">{digitE1}</span>
                            <span className="timer-digit">{digitE0}</span>
                        </div>
                    </div>
                </div>
                <ul className="board" style={{ '--cols': numberOfColumns } as CSSProperties}>
                    {board.map((tile, index) => (
                        <li key={index}>
                            <Tile
                                value={tile.value}
                                isCovered={tile.isCovered}
                                isFlagged={tile.isFlagged}
                                onClick={tile.isCovered ? () => uncoverTile(index) : () => strobe(index)}
                                onContextMenu={(e: MouseEvent) => {
                                    e.preventDefault()
                                    setFlag(index, !tile.isFlagged)
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default Game