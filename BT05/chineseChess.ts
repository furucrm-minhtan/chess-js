let tableChineseChess: Array<Array<any>>;
let chineseChess: any = {
        1: 'bchariot',
        2: 'bhorse',
        3: 'belephant',
        4: 'bmandarin',
        5: 'bgeneral',
        6: 'bmandarin',
        7: 'belephant',
        8: 'bhorse',
        9: 'bchariot',
        20: 'bcannon',
        26: 'bcannon',
        28: 'bsoldier',
        30: 'bsoldier',
        32: 'bsoldier',
        34: 'bsoldier',
        36: 'bsoldier',
        55: 'rsoldier',
        57: 'rsoldier',
        59: 'rsoldier',
        61: 'rsoldier',
        63: 'rsoldier',
        65: 'rcannon',
        71: 'rcannon',
        82: 'rchariot',
        83: 'rhorse',
        84: 'relephant',
        85: 'rmandarin',
        86: 'rgeneral',
        87: 'rmandarin',
        88: 'relephant',
        89: 'rhorse',
        90: 'rchariot'
};

enum typeMoveChineseChess {
    DiagonalLine,
    Horizontal,
    Vertical
};

const getColChineseChessBoard = (index: number) => {
    return (+index % 9 || 9) -1 ;
}

const showMoveOnChineseBoard = (type: 'add' | 'remove', { row, col, chess }: {row: number, col: number, chess: string}) => {
    // tableChineseChess.forEach((rowTable: Array<String>, index: number) => {
    //     rowTable.forEach( (colTable: any, colIndex: number) => {
    //         const element = document.querySelector(`img[data-row="${index}"][data-col="${colTable.index}"]`) as HTMLElement;
    //         console.log((tableChineseChess[index][colIndex] as any).curChess.name == '');
    //         if (element.parentElement && checkMoveChineseChess(chess, +index ,colIndex, +row, +col) && (tableChineseChess[index][colIndex] as any).curChess.name == '') {
    //             type === 'add' ? element.parentElement.classList.add('highlight') : element.parentElement.classList.remove('highlight');
    //         }
    //     });
    // })
}

// check chess can attack opponent
const attackRivalChineseChess = ({chess: newChess, row: newRow, col: newCol}: {chess: string, row: number, col: number}, {chess: oldChess, row: oldRow, col: oldCol}: {chess: string, row: number, col: number}): string => {
    const chessTeam = getChineseChessTeam({ chess: oldChess });
    const countRow = newRow - oldRow;
    const countCol = Math.abs(newCol - oldCol);
    const stop = 'prevent';
    
    if (newChess.substring(0, 1) == chessTeam) return stop;
    

    return '';
}

const updateTableChineseChess = (oldPosition: { row: number, col: number }, newPosition: { row: number, col: number }): void => {
    let oldCol = +oldPosition.col;
    let newCol = +newPosition.col;
    let oldCell: any = tableChineseChess[oldPosition.row][oldCol];
    console.log((tableChineseChess[newPosition.row][newCol] as any), (tableChineseChess[oldPosition.row][oldCol] as any) , oldCol, newCol);
    (tableChineseChess[newPosition.row][newCol] as any).curChess = oldCell.curChess;
    (tableChineseChess[oldPosition.row][oldCol] as any).curChess = getChessChinese(oldPosition.row, oldCol, '');
    console.log((tableChineseChess[newPosition.row][oldCol] as any), (tableChineseChess[oldPosition.row][newCol] as any) , getChessChinese(oldPosition.row, oldCol, ''));
}

const checkTypeMoveChineseChess = (milestone: number, oldMove: number, newMove: number, typeMove: typeMoveChineseChess): boolean => {
    switch (typeMove) {
        case typeMoveChineseChess.Vertical: {
            const cell: any = tableChineseChess[oldMove][milestone];
            if (cell.curChess.name ) return true;
            break;
        }
        case typeMoveChineseChess.Horizontal: {
            const cell: any = tableChineseChess[milestone][oldMove];
            if (cell.curChess.name) return true;
            break;
        }
        case typeMoveChineseChess.DiagonalLine: {
            const cell: any = tableChineseChess[milestone][newMove];
            console.log(cell);
            if (cell.curChess.name) return true;                    
        }
    }
    return false;
}

const checkBarrierOnMoveChineseChess = (milestone: number, oldMove: number, newMove: number, typeMove: typeMoveChineseChess): boolean => {
    if (oldMove < newMove) {
        console.log(oldMove, newMove);
        for (; oldMove < newMove; oldMove++) {
            console.log(oldMove, newMove)
            if (checkTypeMoveChineseChess(milestone, oldMove, newMove, typeMove)) return true;
            if(typeMove == typeMoveChineseChess.DiagonalLine) 
                milestone++;
        }
    }
    else {
        for (; oldMove > newMove; oldMove--) {
            if (checkTypeMoveChineseChess(milestone, oldMove, newMove, typeMove)) return true;
            if (typeMove == typeMoveChineseChess.DiagonalLine)
                milestone--;
        }
    }
    
    return false;
}

const checkMoveChineseChess = (chess: string, newRow: number, newCol: number, oldRow: number, oldCol: number): boolean => {
    const countRow: number = Math.abs(newRow - oldRow);
    const countCol: number = Math.abs(newCol - oldCol);
    let result: boolean = true;
    console.log(chess);
    switch (chess) {
        case 'rsoldier':
        case 'bsoldier': {
            result = newRow < 6 ? countCol == 0 && countRow == 1 : (countCol == 1 && countRow == 0) || (countRow == 1 && countCol == 0);
            break;
        }
        case 'bhorse':
        case 'rhorse': {
            // || (countRow == 0 && countCol == 2); 
            // result = (countRow == 2 && countCol == 0) || (countCol == 1 && countRow == 0);
            result = (countRow == 2 && countCol == 1) || (countCol == 2 && countRow == 1);
            break;
        }
        case 'rchariot':
        case 'bchariot':
        case 'bcannon':
        case 'rcannon': {
            // console.log({countRow, countCol});
            result = (countCol == 0 && countRow <= 10) || (countRow == 0 && countCol <= 9);
            break;
        }
        case 'relephant':
        case 'belephant': {
            //  console.log({newRow, countRow, countCol});
            result = newRow < 5 && (countRow == 2 && countCol == 2);
            break;
        }
        case 'rmandarin':
        case 'bmandarin': {
            const col = newCol;
          
            result = (col > 2 && col < 6) && ((newRow > 0 && newRow < 4) || (newRow > 7 && newRow < 10)) && (countCol == 1 && countRow == 1);
            break;
        }  
        case 'rgeneral':
        case 'bgeneral': {
            const col = newCol;
           
            result = (col > 2 && col < 6) && (chess == 'bgeneral' ? newRow >= 0 && newRow < 3 : newRow > 6 && newRow <= 9) && ((countCol == 0 && countRow <= 3) || (countRow == 0 && countCol <= 3));
            break;
        }
    }
    
    const checkChess = (chess.includes('horse') || chess.includes('elephant'));

    if (!checkChess && countRow && countCol) {
        console.log(oldRow + 1, getColChineseChessBoard(oldCol), getColChineseChessBoard(newCol));
        result &&= !checkBarrierOnMoveChineseChess(oldRow,oldCol, newCol, typeMoveChineseChess.DiagonalLine);
    }
    else if (!checkChess && countRow) {
        result &&= !checkBarrierOnMoveChineseChess(oldCol, oldRow, newRow, typeMoveChineseChess.Vertical);
    }
    else if (!checkChess && countCol) {
        result &&= !checkBarrierOnMoveChineseChess(oldRow,oldCol, newCol, typeMoveChineseChess.Horizontal);
    }
    else if (checkChess) {
        result &&= !checkBarrierOnMoveChineseChess(oldCol, oldRow, newRow, typeMoveChineseChess.Vertical) && !checkBarrierOnMoveChineseChess(newRow, oldCol , newCol, typeMoveChineseChess.Horizontal);
    }

    return result;
}

const getChineseChessTeam = ({ chess }: { chess: string }) => {
    return chess.substring(0, 1);
}

const getChessChinese = (row: number, col: number, chessUsed?: string): any => {
    let chess = chessUsed ?? (chessUsed || chineseChess[col]);
    return ({ img: chess || '', name: chess || '' });
}

const setChineseChess = (element: HTMLElement, { row, col, nameChess }: { row: number, col: number, nameChess: any }): void => {
    if (!element) return;
    let chess = !nameChess ? { img: '', name: '' } : getChessChinese(row, col, nameChess);

    const data: any = {
        src: `./public/ChineseChessboard/${chess.img}.jpg`,
        'data-chess': chess.name,
        id: `${chess.name}-${col}`
    };
    for (const key in data) {
        element.setAttribute(key, data[key]);
    }
    element.style.display = chess.img ? 'initial' : 'none';
}

const changePositionChess = (oldData: any, event: DragEvent): void => {
    const oldElement = document.querySelector(`img[data-row="${oldData.row}"][data-col="${oldData.col}"][data-chess=${oldData.chess}]`) as HTMLElement;
    let newElement = (event.target as HTMLElement);
    newElement = newElement.nodeName === 'IMG' ? newElement : newElement.firstElementChild as HTMLElement;
    const newData = JSON.parse(JSON.stringify((newElement.dataset)));
    // const chessTeam = getChineseChessTeam(oldData);
    try {
        const resultCheckMove: boolean = !checkMoveChineseChess(oldData.chess, Number(newData.row), Number(newData.col), Number(oldData.row), Number(oldData.col));
        const resultAttackRival: string = attackRivalChineseChess(newData, oldData);

        if ((!oldData.chess.includes('cannon') && (resultCheckMove || resultAttackRival == 'prevent')) || ( oldData.chess.includes('cannon') && !resultCheckMove && resultAttackRival == '' && newData.chess != '')) return;

        if (oldElement) {
            // if (newData.chess.substring(0, 1) == chessTeam) return;

            setChineseChess(oldElement, { row: oldData.row, col: oldData.col, nameChess: resultAttackRival });
        }
        if (newElement) {
            setChineseChess(newElement, { row: newData.row, col: newData.col, nameChess: oldData.chess });
        }
        updateTableChineseChess(oldData, newData);
        console.log(tableChineseChess);
    }
    catch (error) {
        console.log(error);
        showMoveOnChineseBoard('remove', oldData);
    }
}

(() => {
    const ChineseChessboard = document.getElementById('chess');
    let html = '';
    let i = 1;
    tableChineseChess = Array.from({ length: 10 }, () => Array.from({ length: 9 }, () => ({ index: i++, curChess: '' })));

    html = tableChineseChess.reduce((init: string, row: any, index: number) => {
        init += `<tr>${row.reduce((cell: string, value: any, col: number) => {
            const chess = getChessChinese(index, value.index);
            value.curChess = chess;
            cell += `<td><img id="${chess.name}-${value.index}" data-row="${index}" data-col="${col}" data-chess="${chess.name}" src="./public/ChineseChessboard/${chess.img}.jpg" dragable="true" style="display: ${chess.img ? 'initial' : 'none'}"></td>`;
            return cell;
        }, '')}</tr>`;
        return init;
    }, '');

    ChineseChessboard!.innerHTML = `<div class="img-container"><img class="board" src="./public/ChineseChessboard/bareboard.jpg"/></div><div class="table"><table>${html}</table></div>`;
    window.setTimeout(() => {
        Array.from(document.getElementsByTagName('td')).forEach((td: HTMLElement) => {
            td.addEventListener('dragover', (event: DragEvent) => event.preventDefault());

            td.addEventListener("drop", (event: DragEvent) => {
                event.preventDefault();
                if (!event.dataTransfer) return;
                const oldData = JSON.parse(event.dataTransfer.getData('cell'));
                showMoveOnChineseBoard('remove', oldData);
                changePositionChess(oldData, event);
            });

        });

        Array.from(document.getElementsByTagName('img')).forEach((img: HTMLElement) => {
            img.addEventListener('dragstart', (event: DragEvent) => {
                console.log((event.target as HTMLElement));
                const element = (event.target as HTMLElement);
                event.dataTransfer?.setData('cell', JSON.stringify(element.dataset));
                showMoveOnChineseBoard('add', JSON.parse(JSON.stringify(element.dataset)));
            }, false);
        });
        // document.getElementById('loading')!.style.display = 'none';
        // ChineseChessboard!.style.display = 'block';
        console.log(tableChineseChess);
    }, 1000);
})()