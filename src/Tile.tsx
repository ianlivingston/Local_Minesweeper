import type {tileValue} from "./BoardInterface.ts";
import type {ReactNode, MouseEvent} from "react";
import flagUrl from './assets/Custom-Icon-Design-Flatastic-1-Flag.svg'
import mineUrl from './assets/Pictogrammers-Material-Mine.svg'

interface TileProps {
    value: tileValue,
    isCovered: boolean,
    isFlagged: boolean,
    onClick: () => void,
    onContextMenu: (e: MouseEvent) => void,
}

function Tile(props: TileProps) {
    let marker: ReactNode
    let className = "MineCell"

    if(props.isCovered) {
        if(props.isFlagged) {
            marker = <img src={flagUrl} alt="flag" className="cell-icon" />
            className += " flagged"
        } else {
            marker = ""
        }
    } else {
        className += " uncovered"
        if(props.value === "M") {
            marker = <img src={mineUrl} alt="mine" className="cell-icon" />
        } else if(props.value === 0) {
            marker = ""
        } else {
            marker = props.value
            className += " value-" + props.value
        }
    }

    return (
        <button className={className} onClick={props.onClick} onContextMenu={props.onContextMenu}>
            {marker}
        </button>
    )
}

export default Tile
