import indicateOffsets from "./indicateOffsets.ts";

export type tileValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "M"

export interface tileData {
    value: tileValue,
    isCovered: boolean,
    isFlagged: boolean,
    numberOfNearbyFlags: number,
}

import {type StateCreator} from 'zustand'

export interface BoardInterface {
    board: tileData[]
    boardDimX: number,
    boardDimY: number,
    totalTiles: number,
    setTileIsCovered: (i: number, isCovered_: boolean) => void,
    setTileValue: (i: number, value: tileValue) => void,
    setTileIsFlagged: (i: number, newIsFlagged: boolean) => void,
    setTile: (i: number, tile: tileData) => void,
    getTile: (i: number) => tileData,
    getNeighbors: (i: number) => number[],
    setBoard: (newBoard: tileData[]) => void,
    setBoardDims: (x: number, y: number) => void,
    newBlankBoard: (x: number, y: number) => void,
    showAll: () => void,
}

const Board: StateCreator<BoardInterface, [], [], BoardInterface> = (set, get) => {
    return ({
        boardDimX: 9,
        boardDimY: 9,
        board: [],
        totalTiles: 81,
        setTile: (i: number, tile: tileData): void => {
            if (isValidIndex(i, get().boardDimX, get().boardDimY)) {
                set((state) => {
                        return ({
                            board: state.board.map((v, index) => {
                                return i === index ? tile : v
                            })
                        });
                    }
                )
            }
        },
        getTile: (i: number): tileData => get().board[i],
        getNeighbors: (i: number): number[] => {
            const lenX = get().boardDimX
            const isNeighbor: boolean[] = indicateOffsets(lenX, i, get().totalTiles)
            const neighbors = [
                i - lenX - 1,
                i - lenX,
                i - lenX + 1,
                i - 1,
                i + 1,
                i + lenX - 1,
                i + lenX,
                i + lenX + 1
            ]
            return neighbors.filter((_v, j) => isNeighbor[j])
        },
        setBoard: (newBoard: tileData[]) => set(() => ({board: newBoard})),
        setTileIsCovered: (i: number, isCovered_: boolean) => set((state) => {
            return ({
                board: state.board.map((tile: tileData, index: number) => {
                    if (index === i) {
                        tile.isCovered = isCovered_
                    }
                    return tile
                })
            });
        }),
        setTileValue: (i: number, value: tileValue) => set((state) => {
            return ({
                board: state.board.map((tile: tileData, index: number) => {
                    if (index === i) {
                        tile.value = value
                    }
                    return tile
                })
            });
        }),
        setTileIsFlagged: (i: number, newIsFlagged: boolean) => set((state) => {
            return ({
                board: state.board.map((tile: tileData, index: number) => {
                    if (index === i) {
                        tile.isFlagged = newIsFlagged
                    }
                    return tile
                })
            });
        }),
        setBoardDims: (x: number, y: number): void => set(() => ({boardDimX: x, boardDimY: y, totalTiles: x * y})),
        newBlankBoard: (x: number, y: number) => {
            get().setBoardDims(x, y)
            set(() => ({
                board: Array.from({length: get().totalTiles}, () =>
                    ({
                        value: 0,
                        isCovered: true,
                        isFlagged: false,
                        numberOfNearbyFlags: 0,
                    }))
            }))
        },
        showAll: () => {
            // console.log("showAll")
            set((state) => ({
                board: state.board.map((tile: tileData) => {
                    tile.isCovered = false
                    return tile
                })
            }))
        }
    });
}

const isValidIndex = (i: number, xDim: number, yDim: number): boolean => {
    return i >= 0 && i < xDim * yDim;
}

export default Board;
