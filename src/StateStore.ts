import {create} from 'zustand'
import type {tileValue, tileData, BoardInterface} from "./BoardInterface.ts";
import Board from "./BoardInterface.ts";

export type difficulty = "Easy" | "Medium" | "Hard"

export interface MineStore {
    uncoveredTilesRemaining: number,
    tilesNotFlagged: number,
    setGameValues: (uncoveredTilesRemaining_: number, tilesNotFlagged_: number) => void,
    placeMines: (totalSquares: number, numMines: number) => void,
    initializeGame: (level: difficulty) => void,
    uncoverTile: (i: number) => void,
}

const useStore = create<MineStore & BoardInterface>()((set, get, s_) => ({
    ...Board(set, get , s_),
    uncoveredTilesRemaining: 71,
    tilesNotFlagged: 10,
    setGameValues: (uncoveredTilesRemaining_: number, tilesNotFlagged_: number) => {
        set(() => ({uncoveredTilesRemaining: uncoveredTilesRemaining_, tilesNotFlagged: tilesNotFlagged_}));
    },
    placeMines: (totalSquares: number, numMines: number) => {
        const mines: number[] = []
        let new_mine_index: number;
        for (let i = 0; i < numMines; i++) {
            while (true) {
                new_mine_index = Math.floor(Math.random() * totalSquares)
                if (!mines.includes(new_mine_index)) {
                    mines.push(new_mine_index);
                    break;
                }
            }
            get().setTileValue(new_mine_index, "M")
            const neighbors: number[] = get().getNeighbors(new_mine_index);
            for (const n of neighbors) {
                const val: tileValue = get().getTile(n).value
                if (typeof val === "number") {
                    // @ts-expect-error: val + 1 is a tileValue
                    get().setTileValue(n, val + 1)
                }
            }
        }
    },
    initializeGame: (level: difficulty) => {
        let lenX: number;
        let lenY: number;
        let totalSquares: number
        let numMines: number

        switch (level) {
            case "Easy":
                get().setGameValues(71, 10);
                lenX = 9;
                lenY = 9;
                totalSquares = 81;
                numMines = 10;
                break;
            case "Medium":
                get().setGameValues(216, 40);
                lenX = 16;
                lenY = 16;
                totalSquares = 256;
                numMines = 40;
                break;
            case "Hard":
                get().setGameValues(381, 99);
                lenX = 30;
                lenY = 16;
                totalSquares = 480;
                numMines = 99;
                break;
        }

        get().newBlankBoard(lenX, lenY)
        get().placeMines(totalSquares, numMines)
    },
    uncoverTile: (i: number) => {
        const tile: tileData = get().getTile(i)
        if (tile.value === "M")
            get().showAll()
        else {
            get().setTileIsCovered(i, false)
        }
    }
}))

export default useStore
