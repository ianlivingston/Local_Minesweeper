interface TileProps {
    isCovered: boolean,
    isFlagged: boolean,
    onClick: () => void,
    onContextmenu: () => void,
}

function Tile(props: TileProps) {
    return (
        <button>

        </button>
    )
}

export default Tile