import useStore from './StateStore.ts'
import Tile from './Tile.tsx'

/* TO DO
Initialize board
implement onclick methods
implement game over
check for victory
 */

function Game() {
    const board = useStore((state) => state.board)
    const uncoverTile = useStore((state) => state.setTileIsCovered)
    const init = useStore((state) => state.initializeGame)

    return (
        <>
            <button onClick={() => init("easy")}>
                Start
            </button>
            <ul
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(9, 1fr)',
                    gridTemplateRows: 'repeat(9, 1fr)',
                }}
            >
                {board.map((tile, index) => (
                    <li key={index}>
                        <Tile
                            value={tile.value}
                            isCovered={tile.isCovered}
                            isFlagged={tile.isFlagged}
                            onClick={() => uncoverTile(index, false)}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Game