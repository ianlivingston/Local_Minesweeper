import type {tileValue} from "./BoardInterface.ts";

interface TileProps {
    value: tileValue,
    isCovered: boolean,
    isFlagged: boolean,
    onClick: () => void,
    onContextMenu: (e: React.MouseEvent) => void,
}

function Tile(props: TileProps) {
    let marker: string | number
    if(props.isCovered) marker = props.isFlagged ? "F" : ""
    else marker = props.value

    return (
        <button className="MineCell" onClick={props.onClick} onContextMenu={props.onContextMenu}>
            {marker}
        </button>
    )
}

export default Tile