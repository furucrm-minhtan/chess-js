"use strict";
let tableChineseChess;
let chineseChess = {
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
var typeMoveChineseChess;
(function (typeMoveChineseChess) {
    typeMoveChineseChess[typeMoveChineseChess["DiagonalLine"] = 0] = "DiagonalLine";
    typeMoveChineseChess[typeMoveChineseChess["Horizontal"] = 1] = "Horizontal";
    typeMoveChineseChess[typeMoveChineseChess["Vertical"] = 2] = "Vertical";
})(typeMoveChineseChess || (typeMoveChineseChess = {}));
;
const getColChineseChessBoard = (index) => {
    return (index % 9 || 9) - 1;
};
const attackRivalChineseChess = ({ chess: newChess, row: newRow, col: newCol }, { chess: oldChess, row: oldRow, col: oldCol }) => {
    const chessTeam = getChineseChessTeam({ chess: oldChess });
    const countRow = newRow - oldRow;
    const countCol = Math.abs(getColChineseChessBoard(newCol) - getColChineseChessBoard(oldCol));
    const stop = 'prevent';
    if (newChess.substring(0, 1) == chessTeam)
        return stop;
    return '';
};
const updateTableChineseChess = (oldPosition, newPosition) => {
    let oldCol = getColChineseChessBoard(+oldPosition.col);
    let newCol = getColChineseChessBoard(+newPosition.col);
    let oldCell = tableChineseChess[oldPosition.row][oldCol];
    tableChineseChess[newPosition.row][oldCol].curChess = oldCell.curChess;
    tableChineseChess[oldPosition.row][newCol].curChess = getChessChinese(oldPosition.row, oldCol, 'square');
};
const checkTypeMoveChineseChess = (milestone, oldMove, newMove, typeMove) => {
    switch (typeMove) {
        case typeMoveChineseChess.Vertical: {
            const cell = tableChineseChess[oldMove][milestone];
            if (cell.curChess.name)
                return true;
            break;
        }
        case typeMoveChineseChess.Horizontal: {
            const cell = tableChineseChess[milestone][oldMove];
            if (cell.curChess.name)
                return true;
            break;
        }
        case typeMoveChineseChess.DiagonalLine: {
            const cell = tableChineseChess[milestone][oldMove];
            console.log({ cell, milestone, oldMove, newMove });
            if (cell.curChess.name)
                return true;
        }
    }
    return false;
};
const checkBarrierOnMoveChineseChess = (milestone, oldMove, newMove, typeMove) => {
    console.log(oldMove, newMove);
    if (oldMove < newMove) {
        for (++oldMove; oldMove < newMove; oldMove++) {
            if (checkTypeMoveChineseChess(milestone, oldMove, newMove, typeMove))
                return true;
            if (typeMove == typeMoveChineseChess.DiagonalLine)
                milestone++;
        }
    }
    else {
        for (--oldMove; oldMove > newMove; oldMove--) {
            if (checkTypeMoveChineseChess(milestone, oldMove, newMove, typeMove))
                return true;
            if (typeMove == typeMoveChineseChess.DiagonalLine)
                milestone--;
        }
    }
    return false;
};
const checkMoveChineseChess = (chess, newRow, newCol, oldRow, oldCol) => {
    const countRow = Math.abs(newRow - oldRow);
    const countCol = Math.abs(getColChineseChessBoard(newCol) - getColChineseChessBoard(oldCol));
    let result = true;
    console.log(chess);
    switch (chess) {
        case 'rsoldier':
        case 'bsoldier': {
            result = newRow < 6 ? countCol == 0 && countRow == 1 : (countCol == 1 && countRow == 0) || (countRow == 1 && countCol == 0);
            break;
        }
        case 'bhorse':
        case 'rhorse': {
            result = (countRow == 2 && countCol == 1) || (countCol == 2 && countRow == 1);
            break;
        }
        case 'rchariot':
        case 'bchariot':
        case 'bcanon':
        case 'rcanon': {
            result = (countRow <= 10 && countCol == 0) || (countRow == 0 && countCol <= 9);
            break;
        }
        case 'relephant':
        case 'belephant': {
            result = newRow < 6 && (countRow == 2 || countCol == 2);
            break;
        }
        case 'rmandarin':
        case 'bmandarin': {
            const col = newCol % 9;
            result = (col > 3 && col < 7) && ((newRow > 0 && newRow < 4) || (newRow > 7 && newRow < 10)) && (countCol == 1 && countRow == 1);
            break;
        }
        case 'rgeneral':
        case 'bgeneral': {
            const col = newCol % 9;
            console.log(col);
            result = (col > 3 && col < 7) && ((newRow > 0 && newRow < 4) || (newRow > 7 && newRow < 10)) && (countRow == 1 || countCol == 1);
            break;
        }
    }
    if (!chess.includes('horse') && countRow && countCol) {
        result && (result = !checkBarrierOnMoveChineseChess(oldRow, getColChineseChessBoard(oldCol), getColChineseChessBoard(newCol), typeMoveChineseChess.DiagonalLine));
    }
    else if (!chess.includes('horse') && countRow) {
        result && (result = !checkBarrierOnMoveChineseChess(getColChineseChessBoard(oldCol), oldRow - 1, newRow - 1, typeMoveChineseChess.Vertical));
    }
    else if (!chess.includes('horse') && countCol) {
        result && (result = !checkBarrierOnMoveChineseChess(oldRow, getColChineseChessBoard(oldCol), getColChineseChessBoard(newCol), typeMoveChineseChess.Horizontal));
    }
    else if (chess.includes('horse')) {
        console.log(oldRow - 1, newRow - 2);
        result && (result = !checkBarrierOnMoveChineseChess(getColChineseChessBoard(oldCol), oldRow - 1, newRow - 1, typeMoveChineseChess.Vertical) && !checkBarrierOnMoveChineseChess(newRow, getColChineseChessBoard(oldCol), getColChineseChessBoard(newCol), typeMoveChineseChess.Horizontal));
    }
    return result;
};
const getChineseChessTeam = ({ chess }) => {
    return chess.substring(0, 1);
};
const getChessChinese = (row, col, chessUsed) => {
    let chess = chessUsed || chineseChess[col] || '';
    return ({ img: chess, name: chess });
};
const setChineseChess = (element, { row, col, nameChess }) => {
    if (!element)
        return;
    let chess = !nameChess ? { img: '', name: '' } : getChessChinese(row, col, nameChess);
    const data = {
        src: `./public/ChineseChessboard/${chess.img}.jpg`,
        'data-chess': chess.name,
        id: `${chess.name}-${col}`
    };
    for (const key in data) {
        element.setAttribute(key, data[key]);
    }
    element.style.display = chess.img ? 'initial' : 'none';
};
const changePositionChess = (data, event) => {
    const oldData = JSON.parse(data);
    const oldElement = document.querySelector(`img[data-row="${oldData.row}"][data-col="${oldData.col}"][data-chess=${oldData.chess}]`);
    let newElement = event.target;
    newElement = newElement.nodeName === 'IMG' ? newElement : newElement.firstElementChild;
    const newData = JSON.parse(JSON.stringify((newElement.dataset)));
    try {
        const resultCheckMove = !checkMoveChineseChess(oldData.chess, Number(newData.row) + 1, Number(newData.col), Number(oldData.row) + 1, Number(oldData.col));
        const resultAttackRival = attackRivalChineseChess(newData, oldData);
        if ((!oldData.chess.includes('cannon') && (resultCheckMove || resultAttackRival == 'prevent')) || (oldData.chess.includes('cannon') && !resultCheckMove && resultAttackRival == '' && newData.chess != ''))
            return;
        if (oldElement) {
            setChineseChess(oldElement, { row: oldData.row, col: oldData.col, nameChess: resultAttackRival });
        }
        if (newElement) {
            setChineseChess(newElement, { row: newData.row, col: newData.col, nameChess: oldData.chess });
        }
        updateTableChineseChess(oldData, newData);
    }
    catch (error) {
        console.log(error);
    }
};
(() => {
    const ChineseChessboard = document.getElementById('chess');
    let html = '';
    let i = 1;
    tableChineseChess = Array.from({ length: 10 }, () => Array.from({ length: 9 }, () => ({ index: i++, curChess: '' })));
    html = tableChineseChess.reduce((init, row, index) => init += `<tr>${row.reduce((cell, col) => {
        const chess = getChessChinese(index, col.index);
        col.curChess = chess;
        cell += `<td><img id="${chess.name}-${col.index}" data-row="${index}" data-col="${col.index}" data-chess="${chess.name}" src="./public/ChineseChessboard/${chess.img}.jpg" dragable="true" style="display: ${chess.img ? 'initial' : 'none'}"></td>`;
        return cell;
    }, '')}</tr>`, '');
    ChineseChessboard.innerHTML = `<div class="img-container"><img class="board" src="./public/ChineseChessboard/bareboard.jpg"/></div><div class="table"><table>${html}</table></div>`;
    window.setTimeout(() => {
        Array.from(document.getElementsByTagName('td')).forEach((td) => {
            td.addEventListener('dragover', (event) => event.preventDefault());
            td.addEventListener("drop", (event) => {
                event.preventDefault();
                if (!event.dataTransfer)
                    return;
                changePositionChess(event.dataTransfer.getData('cell'), event);
            });
        });
        Array.from(document.getElementsByTagName('img')).forEach((img) => {
            img.addEventListener('dragstart', (event) => {
                var _a;
                console.log(event.target);
                const element = event.target;
                (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('cell', JSON.stringify(element.dataset));
            }, false);
        });
        console.log(tableChineseChess);
    }, 1000);
})();
//# sourceMappingURL=chineseChess.js.map