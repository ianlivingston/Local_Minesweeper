import type {tileValue} from "./BoardInterface.ts";

interface TileProps {
    value: tileValue,
    isCovered: boolean,
    isFlagged: boolean,
    onClick: () => void,
}

function Tile(props: TileProps) {
    return (
        <button onClick={props.onClick}>
            {props.isCovered ? "H" : props.value}
        </button>
    )
}

export default Tile