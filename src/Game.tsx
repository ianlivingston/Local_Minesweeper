import useStore from './StateStore.ts'
import Tile from './Tile.tsx'
import type {difficulty} from "./StateStore.ts"
import {type ChangeEvent, type MouseEvent, type CSSProperties, useState} from "react";
import './Game.css'

function Game() {
    const board = useStore((state) => state.board)
    const uncoverTile = useStore((state) => state.uncoverTile)
    const init = useStore((state) => state.initializeGame)
    const setFlag = useStore((state) => state.setTileIsFlagged)
    const numberOfColumns = useStore((state) => state.boardDimX)

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
                <button id="startButton" onClick={() => init(level)}>
                    Start
                </button>
            </div>
            <ul style={{ '--cols': numberOfColumns } as CSSProperties}>
                {board.map((tile, index) => (
                    <li key={index}>
                        <Tile
                            value={tile.value}
                            isCovered={tile.isCovered}
                            isFlagged={tile.isFlagged}
                            onClick={() => uncoverTile(index)}
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