interface ArrayConstructor {
    from(arrayLike: any, mapFn?: any, thisArg?: Array<any>): Array<any>;
}

let table: Array<Array<String>>;
let count = 1;
const initChess: any = {
    0: {
        0: 'blackrookon',
        1: 'blackknighton',
        2: 'blackbishopon',
        3: 'blackqueenon',
        4: 'blackkingon',
        5: 'blackbishopon',
        6: 'blackknighton',
        7: 'blackrookon'
    },
    1: {
        0: 'blackpawnon',
        1: 'blackpawnon',
        2: 'blackpawnon',
        3: 'blackpawnon',
        4: 'blackpawnon',
        5: 'blackpawnon',
        6: 'blackpawnon',
        7: 'blackpawnon'
    },
    6: {
        0: 'whitepawnon',
        1: 'whitepawnon',
        2: 'whitepawnon',
        3: 'whitepawnon',
        4: 'whitepawnon',
        5: 'whitepawnon',
        6: 'whitepawnon',
        7: 'whitepawnon'
    },
    7: {
        0: 'whiterookon',
        1: 'whiteknighton',
        2: 'whitebishopon',
        3: 'whitequeenon',
        4: 'whitekingon',
        5: 'whitebishopon',
        6: 'whiteknighton',
        7: 'whiterookon'
    }
};
enum typeMoveChess {
    DiagonalLine,
    Horizontal,
    Vertical
};

const showMoveOnBoard = (type: 'add' | 'remove', { row, col, chess }: {row: number, col: number, chess: string}) => {
    table.forEach((rowTable: Array<String>, index: number) => {
        rowTable.forEach( (colTable: any, colIndex: number) => {
            const element = document.querySelector(`img[data-row="${index}"][data-col="${colIndex}"]`) as HTMLElement;
            if (index == 1 && +colTable.index == 12) console.log(checkMove(chess, +index, colTable.index, +row, +col));
            if (element.parentElement && checkMove(chess, index , colIndex, +row, +col) && (table[index][colIndex] as any).curChess.name == 'square') {
                type === 'add' ? element.parentElement.classList.add('highlight') : element.parentElement.classList.remove('highlight');
            }
        });
    })
}

const getColChessBoard = (index: number) => {
    return (+index % 8 || 8) - 1;
}

// check chess can attack opponent
const attackRival = ({chess: newChess, row: newRow, col: newCol}: {chess: string, row: number, col: number}, {chess: oldChess, row: oldRow, col: oldCol}: {chess: string, row: number, col: number}, resultCheckMove: boolean): string => {
    const chessTeam = getChessTeam(oldChess);
    const countRow = newRow - oldRow;
    const countCol = Math.abs(newCol - oldCol);
    const stop = 'prevent';
    console.log(newChess.includes(chessTeam));
    if (newChess.includes(chessTeam)) resultCheckMove = false;
    else if(newChess != 'square') {
        // console.log({oldChess,countRow, countCol});
        if (oldChess.substring(5) == 'pawnon' && (countRow == 1 && countCol == 1)) resultCheckMove = true; 
    }

    return resultCheckMove ? 'square' : stop;
}

const updateTable = (oldPosition: { row: number, col: number }, newPosition: { row: number, col: number }): void => {
    let oldCol = +oldPosition.col;
    let newCol = +newPosition.col;
    let oldCell: any = table[oldPosition.row][oldCol];
    // console.log(oldCell.curChess);
    (table[newPosition.row][newCol] as any).curChess = oldCell.curChess;
    (table[oldPosition.row][oldCol] as any).curChess = getChess(oldPosition.row, oldCol, 'square');
    // console.log(table[newPosition.row][oldCol], table[oldPosition.row][newCol]);
}

const checkTypeMoveChess = (milestone: number, oldMove: number, newMove: number, typeMove: typeMoveChess, team: string): boolean => {
    let cell: any;
    switch (typeMove) {
        case typeMoveChess.Vertical: {
            cell = table[oldMove][milestone];
            break;
        }
        case typeMoveChess.Horizontal: {
            cell = table[milestone][oldMove];
            break;
        }
        case typeMoveChess.DiagonalLine: {
            cell = table[milestone][oldMove];
        }
    }
    console.log(cell);
    if (cell.curChess.name && cell.curChess.name != 'square' && cell.curChess.name.includes(team)) return true;
    return false;
}

const checkBarrierOnMove = (oldRow: number, newRow: number, oldMove: number, newMove: number, typeMove: typeMoveChess, team: string): boolean => {
    if (oldMove < newMove) {
        oldMove++;
        for (;  oldMove <= newMove; oldMove++) {
            if (checkTypeMoveChess(oldRow, oldMove, newMove, typeMove, team)) return true;
            if(typeMove == typeMoveChess.DiagonalLine) 
                oldRow < newRow ? oldRow++ : oldRow--;
        }
    }
    else {
        oldMove--;
        for (; oldMove >= newMove; oldMove--) {
            if (checkTypeMoveChess(oldRow, oldMove, newMove, typeMove, team)) return true;
            if (typeMove == typeMoveChess.DiagonalLine)
                oldRow < newRow ? oldRow++ : oldRow--;
        }
    }
    
    return false;
}


const checkMove = (chess: string, newRow: number, newCol: number, oldRow: number, oldCol: number): boolean => {
    const team = getChessTeam(chess);
    chess = chess.substring(5);
    const row = newRow - oldRow;
    const col = newCol - oldCol;
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
        checkBarrierOnMove(row > 0 ? oldRow + 1 : oldRow - 1, newRow, oldCol, newCol, typeMoveChess.DiagonalLine, team);
        result &&= !checkBarrierOnMove(row > 0 ? oldRow + 1 : oldRow - 1, newRow, oldCol, newCol, typeMoveChess.DiagonalLine, team);
    }   
    else if (chess != 'knighton' && countRow) {
        console.log(result);
        result &&= !checkBarrierOnMove(oldCol, 0, +oldRow , +newRow, typeMoveChess.Vertical, team);
    }
    else if (chess != 'knighton' && countCol) {
        result &&= !checkBarrierOnMove(oldRow, 0, oldCol , newCol, typeMoveChess.Horizontal, team);
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
    console.log({row, col})
    let chess = chessUsed || (initChess[row] ? initChess[row][col] : `square`) || `square`;
    
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
        const resultCheckMove: boolean = checkMove(oldData.chess, Number(newData.row), Number(newData.col), Number(oldData.row), Number(oldData.col));
        const resultAttackRival: string = attackRival(newData, oldData, resultCheckMove);
        console.log(resultAttackRival);
        if (resultAttackRival == 'prevent') return;
        if (oldElement) {
            console.log(1);
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

    html = table.reduce((table: string, row: any, index: number): string => {
        table += `<tr>${row.reduce((cell: string, value: any, col: number): string => {
            let chess = getChess(index,col);
            value.curChess = chess;
            cell += `<td class=""><img id="${chess.name}-${index}-${col}" data-row="${index}" data-col="${col}" data-chess="${chess.name}" src="./public/ChessBoard/${chess.img}.gif" dragable="true"></td>`;
            return cell;
        }, '')}</tr>`;
        return table;
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