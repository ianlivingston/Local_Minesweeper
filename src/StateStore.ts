import {create} from 'zustand'

type tileValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "M"
type difficulty = "easy" | "medium" | "hard"

interface tileData {
    value: tileValue,
    isCovered: boolean,
    isFlagged: boolean,
    numberOfNearbyFlags: number,
}

interface MineStore {
    board: tileData[]
    boardDimX: number,
    boardDimY: number,
    uncoveredTilesRemaining: number,
    tilesNotFlagged: number,
    getTileIndex: (x: number, y: number) => number,
    uncoverTile: (x: number, y: number) => void,
    uncoverTilesWithRightClick: (x: number, y: number) => void,
    initializeBoard: (x: number, y: number) => void,
    initializeGame: (level: difficulty) => void,
}

const useStore = create<MineStore>()((set, get) => ({
    boardDimX: 16,
    boardDimY: 16,
    board: [],
    uncoveredTilesRemaining: 100,
    tilesNotFlagged: 40,
    getTileIndex: (x: number, y: number) => {
        if(x < 0 || y < 0 || x >= get().boardDimX || y >= get().boardDimY) {
            return -1
        }
        return y * get().boardDimX + x
    },
    uncoverTile: (x: number, y: number) => set((state) => {
        return ({
            board: state.board.map((tile: tileData, index: number) => {
                if (index === state.getTileIndex(x, y)) {
                    tile.isCovered = false
                }
                return tile
            })
        });
    }),
    uncoverTilesWithRightClick: (x: number, y: number) => get().uncoverTile(x, y),
    initializeBoard: (x: number, y: number) => null,
    initializeGame: (level: difficulty) => {
        const initialBoard: tileData[] = []
        let totalSquares = 0

        switch (level) {
            case "easy":
                set(() => ({
                    boardDimX: 9,
                    boardDimY: 9,
                    tilesNotFlagged: 10,
                }));
                initialBoard.length = 81;
                totalSquares = 81;
                break;
            case "medium":
                set(() => ({
                    boardDimX: 16,
                    boardDimY: 16,
                    tilesNotFlagged: 40,
                }));
                initialBoard.length = 256;
                totalSquares = 256;
                break;
            case "hard":
                set(() => ({
                    boardDimX: 30,
                    boardDimY: 16,
                    tilesNotFlagged: 99,
                }));
                initialBoard.length = 480;
                totalSquares = 480;
                break;
            default:
        }

        initialBoard.fill({
            value: 0,
            isCovered: true,
            isFlagged: false,
            numberOfNearbyFlags: 0,
        })

        const mines: number[] = []
        let new_mine_index: number;
        for(let i = 0; i < get().tilesNotFlagged; i++) {
            while(true) {
                new_mine_index = Math.floor(Math.random() * totalSquares)
                if(!mines.includes(new_mine_index)) {
                    mines.push(new_mine_index);
                    break;
                }
            }
            initialBoard[new_mine_index].value = "M"
        }
    },
}))

export default useStore
