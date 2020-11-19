interface ArrayConstructor {
    from(arrayLike: any, mapFn?: any, thisArg?: Array<any>): Array<any>;
}

let table: Array<Array<String>>;
let count = 1;
const initChess: any = {
    1: 'blackrookon',
    2: 'blackknighton',
    3: 'blackbishopon',
    4: 'blackqueenon',
    5: 'blackkingon',
    6: 'blackbishopon',
    7: 'blackknighton',
    8: 'blackrookon',
    9: 'blackpawnon',
    10: 'blackpawnon',
    11: 'blackpawnon',
    12: 'blackpawnon',
    13: 'blackpawnon',
    14: 'blackpawnon',
    15: 'blackpawnon',
    16: 'blackpawnon',
    49: 'whitepawnon',
    50: 'whitepawnon',
    51: 'whitepawnon',
    52: 'whitepawnon',
    53: 'whitepawnon',
    54: 'whitepawnon',
    55: 'whitepawnon',
    56: 'whitepawnon',
    57: 'whiterookon',
    58: 'whiteknighton',
    59: 'whitebishopon',
    60: 'whitequeenon',
    61: 'whitekingon',
    62: 'whitebishopon',
    63: 'whiteknighton',
    64: 'whiterookon'
};
enum typeMoveChess {
    DiagonalLine,
    Horizontal,
    Vertical
};

const showMoveOnBoard = (type: 'add' | 'remove', { row, col, chess }: {row: number, col: number, chess: string}) => {
    table.forEach((rowTable: Array<String>, index: number) => {
        rowTable.forEach( (colTable: any, colIndex: number) => {
            const element = document.querySelector(`img[data-row="${index}"][data-col="${colTable.index}"]`) as HTMLElement;
            if (index == 1 && +colTable.index == 12) console.log(checkMove(chess, +index, colTable.index, +row, +col));
            if (element.parentElement && checkMove(chess, +index , colTable.index, +row, +col) && (table[index][colIndex] as any).curChess.name == 'square') {
                type === 'add' ? element.parentElement.classList.add('highlight') : element.parentElement.classList.remove('highlight');
            }
        });
    })
}

const getColChessBoard = (index: number) => {
    // console.log((index % 8 || 8) - 1);
    return (+index % 8 || 8) - 1;
}

// check chess can attack opponent
const attackRival = ({chess: newChess, row: newRow, col: newCol}: {chess: string, row: number, col: number}, {chess: oldChess, row: oldRow, col: oldCol}: {chess: string, row: number, col: number}): string => {
    const chessTeam = getChessTeam(oldChess);
    const countRow = newRow - oldRow;
    const countCol = Math.abs(getColChessBoard(newCol) - getColChessBoard(oldCol));
    const stop = 'prevent';
    
    if (newChess.includes(chessTeam)) return stop;
    else if(newChess != 'square') {
        // console.log({oldChess,countRow, countCol});
        if (oldChess.substring(5) == 'pawnon' && !(countRow == 1 && countCol == 1) ) return stop; 
    }

    return 'square';
}

const updateTable = (oldPosition: { row: number, col: number }, newPosition: { row: number, col: number }): void => {
    let oldCol = getColChessBoard(+oldPosition.col);
    let newCol = getColChessBoard(+newPosition.col);
    let oldCell: any = table[oldPosition.row][oldCol];
    // console.log(oldCell.curChess);
    (table[newPosition.row][oldCol] as any).curChess = oldCell.curChess;
    (table[oldPosition.row][newCol] as any).curChess = getChess(oldPosition.row, oldCol, 'square');
    // console.log(table[newPosition.row][oldCol], table[oldPosition.row][newCol]);
}

const checkTypeMoveChess = (milestone: number, oldMove: number, newMove: number, typeMove: typeMoveChess): boolean => {
    switch (typeMove) {
        case typeMoveChess.Vertical: {
            const cell: any = table[oldMove][milestone];
            if (cell.curChess.name && cell.curChess.name != 'square') return true;
            break;
        }
        case typeMoveChess.Horizontal: {
            const cell: any = table[milestone][oldMove];
            if (cell.curChess.name && cell.curChess.name != 'square') return true;
            break;
        }
        case typeMoveChess.DiagonalLine: {
            const cell: any = table[milestone][oldMove];
            console.log({ cell, milestone, oldMove, newMove });
            if (cell.curChess.name && cell.curChess.name != 'square') return true;                    
        }
    }
    return false;
}

const checkBarrierOnMove = (milestone: number, oldMove: number, newMove: number, typeMove: typeMoveChess, options: 'default' | 'none'): boolean => {

    if (oldMove < newMove) {
        if (options === 'default') oldMove++;
        for (;  oldMove <= newMove; oldMove++) {
            if (checkTypeMoveChess(milestone, oldMove, newMove, typeMove)) return true;
            if(typeMove == typeMoveChess.DiagonalLine) 
                milestone++;
        }
    }
    else {
        if (options === 'default') oldMove--;
        for (; oldMove >= newMove; oldMove--) {
            if (checkTypeMoveChess(milestone, oldMove, newMove, typeMove)) return true;
            if (typeMove == typeMoveChess.DiagonalLine)
                milestone--;
        }
    }
    
    return false;
}


const checkMove = (chess: string, newRow: number, newCol: number, oldRow: number, oldCol: number): boolean => {
    const team = getChessTeam(chess);
    chess = chess.substring(5);
    const row = newRow - oldRow;
    const col = getColChessBoard(newCol) - getColChessBoard(oldCol);
    const countRow: number = Math.abs(row);
    const countCol: number = Math.abs(col);
    let result: boolean = true;
    // console.log(chess);
    switch (chess) {
        case 'pawnon': {
            result = (oldRow == 1 || oldRow == 6 ? ((countRow <= 2 && countCol == 0) || (countCol <= 2 && countRow == 0)) : (countRow == 1 && countCol == 0 || countRow == 0 && countCol == 1)) && (team == 'black' ? row > 0 : row < 0 ) ;
            break;
        }
        case 'rookon': {
            result = (countRow <= 8 && countCol == 0) || (countRow == 0 && countCol <= 8); 
            break;
        }
        case 'knighton': {
            result = (countRow == 1 && countCol == 2) || (countRow == 2 && countCol == 1);
            break;
        }
        case 'bishopon': {
            result = (countRow == countCol); 
            break;
        }
        case 'queenon': {
            result = (countRow <= 8 && countCol == 0) || (countRow == 0 && countCol <= 8) || (countRow == countCol);
            break;
        }
        case 'kingon': {
            result = (countRow == 1 || countCol == 1);
            break;
        }
        default: {
            return false;
        }
    }


    
    if (chess != 'knighton' && countRow && countCol) {
        // console.log(countRow, countCol);
        result &&= !checkBarrierOnMove(oldRow + 1, getColChessBoard(oldCol), getColChessBoard(newCol), typeMoveChess.DiagonalLine, 'none');
    }
    else if (chess != 'knighton' && countRow) {
        console.log(result);
        result &&= !checkBarrierOnMove(getColChessBoard(oldCol), +oldRow , +newRow, typeMoveChess.Vertical, 'default');
    }
    else if (chess != 'knighton' && countCol) {
        result &&= !checkBarrierOnMove(oldRow, getColChessBoard(oldCol) , getColChessBoard(newCol), typeMoveChess.Horizontal, 'default');
    }
    
    return result;
}

const getChessTeam = (chessName: string) => {
    return /(white)/.test(chessName) ? 'white' : 'black';
}

const getColor = (row: number, col: number, chess: string): string => {
    let color = (Number(col) + Number(row)) % 2 !== 0 ? 'light' : 'dark';
    return chess != 'square' ? chess+color : color+chess;
}

const getChess = (row: number, col: number, chessUsed?: string): any => {
    let chess = chessUsed || initChess[col] || `square`;
    return ({ img: getColor(row, col, chess), name: chess });
}

const setChess = (element: HTMLElement, {row, col, nameChess}: {row: number, col: number, nameChess: any}): void => {
    if (!element) throw new Error('element is undefined');
    let chess = getChess(row, col, nameChess);

    const data: any = {
        src: `./public/ChessBoard/${chess.img}.gif`,
        'data-chess': chess.name,
        id: `${chess.name}-${col}`
    };
    for (const key in data) {
        element.setAttribute(key, data[key]);
    }
}

const setColorChess = (oldData: any, event: DragEvent) => {
    const oldElement = document.querySelector(`img[data-row="${oldData.row}"][data-col="${oldData.col}"][data-chess=${oldData.chess}]`) as HTMLElement;
    const newElement = event.target as HTMLElement;
    const newData = JSON.parse(JSON.stringify(newElement.dataset));
    // const chessTeam = getChessTeam(oldData);
    try {
        console.log(newData);
        const resultCheckMove: boolean = !checkMove(oldData.chess, Number(newData.row), Number(newData.col), Number(oldData.row), Number(oldData.col));
        const resultAttackRival: string = attackRival(newData, oldData);

        if (resultCheckMove && resultAttackRival == 'prevent') return;
        if (oldElement) {
            // let nameChess = newData.chess != 'square' ? (!newData.chess.includes(chessTeam) ? newData.chess : 'prevent') : 'square';
            // if (nameChess === 'prevent') return;
            setChess(oldElement, { row: oldData.row, col: oldData.col, nameChess: resultAttackRival });
        }
        if (newElement) {
            setChess(newElement, { row: newData.row, col: newData.col, nameChess: oldData.chess });
        }
        updateTable(oldData, newData);
    } catch (error) {
        console.log(error);
        showMoveOnBoard('remove', oldData);
    }
}

(() => {
    const chessBoard = document.getElementById('chess');
    let html = '';
    let i = 1;
    table = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ({ index: i++, curChess: '' })));

    html = table.reduce((init: string, row: any, index: number): string => {
        init += `<tr>${row.reduce((cell: string, col: any): string => {
            let chess = getChess(index, col.index);
            col.curChess = chess;
            cell += `<td class=""><img id="${chess.name}-${col.index}" data-row="${index}" data-col="${col.index}" data-chess="${chess.name}" src="./public/ChessBoard/${chess.img}.gif" dragable="true"></td>`;
            return cell;
        }, '')}</tr>`;
        return init;
    }, '');
    chessBoard!.innerHTML = `<table>${html}</table>`;
    chessBoard!.addEventListener('drop drag dragover', (event: any) => {
        event.stopPropagation();
        event.preventDefault();
    });
    
    window.setTimeout(() => {
        Array.from(document.getElementsByTagName('td')).forEach((td: HTMLElement) => {
            td.addEventListener('dragover', (event: DragEvent) => event.preventDefault());
            
            td.addEventListener("drop", (event: DragEvent) => {
                event.preventDefault();
                if (!event.dataTransfer) return;
                const oldData = JSON.parse(event.dataTransfer.getData('cell'));
                showMoveOnBoard('remove', oldData);
                setColorChess(oldData, event);
            });

        });

        Array.from(document.getElementsByTagName('img')).forEach((img: HTMLElement) => {
            img.addEventListener('dragstart', (event: DragEvent) => {
                console.log((event.target as HTMLElement));
                const element = (event.target as HTMLElement);
                event.dataTransfer?.setData('cell', JSON.stringify(element.dataset));
                showMoveOnBoard('add', JSON.parse(JSON.stringify(element.dataset)));
            });
        });
        document.getElementById('loading')!.style.display = 'none';
        chessBoard!.style.display = 'block';
        console.log(table);
    }, 1000);
})()