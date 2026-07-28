import useStore from './StateStore.ts'
import Tile from './Tile.tsx'
import type {difficulty} from "./StateStore.ts"
import {type ChangeEvent, type MouseEvent, type CSSProperties, useState} from "react";
import './Game.css'

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

    const [level, setLevel] = useState<difficulty>("Easy")

    const changeLevel = (e: ChangeEvent) => {
        //@ts-expect-error: value isn't on target
        setLevel(e.target.value)
    }

    return (
        <>
            <div id="LevelSelect">
                <select onChange={changeLevel}>
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
                <p>{digitE2}</p>
                <p>{digitE1}</p>
                <p>{digitE0}</p>
            </div>
            <ul style={{ '--cols': numberOfColumns } as CSSProperties}>
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
        </>
    )
}

export default Game