export default function indicateOffsets(dimX: number, index: number, totalSquares: number): boolean[] {
    const inFirstCol: boolean = index % dimX === 0;
    const inLastCol: boolean = index % dimX === dimX - 1;
    const inFirstRow: boolean = index - dimX < 0;
    const inLastRow: boolean = index + dimX >= totalSquares;

    const offsets: boolean[] = Array(8).fill(true)

    if(inFirstCol){
        offsets[0] = false
        offsets[3] = false
        offsets[5] = false
    }

    if(inLastCol){
        offsets[2] = false
        offsets[4] = false
        offsets[7] = false
    }

    if(inFirstRow) {
        offsets[0] = false
        offsets[1] = false
        offsets[2] = false
    }

    if(inLastRow){
        offsets[5] = false
        offsets[6] = false
        offsets[7] = false
    }

    return offsets;
}