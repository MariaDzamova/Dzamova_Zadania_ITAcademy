// import {Clue, Mine, StateEnum} 

//     from 'minesweeper-core.js';



// ----- MODEL --------

const StateEnum = { OPEN: 1, CLOSED: 2, MARKED: 3 };
class Tile { constructor(state = StateEnum.CLOSED) { this.state = state; } }
class Mine extends Tile { }
class Clue extends Tile {
    constructor(value, state) {
        super(state);
        this.value = value;
    }
}

// ----- END MODEL ----------
let field = [];
let rowCount = 10, colCount = 10, mineCount = 0;
minesweeper();

function minesweeper() {
    initField();
    printField();
}

function printField() {
    let str = '  ';
    for (let index = 0; index < field[0].length; index++) {
        str += index + ' ';
    }
    str += '\n';
    // CLOSED: '-', MARKED: 'M', OPEN: '*' alebo cislo
    for (let row = 0; row < rowCount; row++) {
        str += String.fromCharCode(65 + row) + ' ';
        for (let col = 0; col < colCount; col++) {
            const tile = field[row][col];
            switch (tile.state) {
                case StateEnum.CLOSED: str += '-'; break;
                case StateEnum.MARKED: str += 'M'; break;
                case StateEnum.OPEN: str += (tile instanceof Mine ? '*' : tile.value); break;
                default: str += (tile instanceof Mine ? '*' : tile.value);
            }
            str += ' ';
        }
        str += '\n';
    }
    console.log(str);
}

function initField() {
    field = [];
    field.length = rowCount;
    for (let row = 0; row < rowCount; row++) {
        field[row] = [];
        field[row].length = colCount;
    }

    let randomRow, randomCol;
    let pocetMin = 0;
    while (pocetMin < mineCount) {
        randomRow = Math.floor(Math.random() * rowCount);
        randomCol = Math.floor(Math.random() * colCount);
        if (!field[randomRow][randomCol]) {
            field[randomRow][randomCol] = new Mine();
            pocetMin++;
        }
    }

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (!field[row][col]) {
                // todo: countAdjacentMines(row, col)
                field[row][col] = new Clue(countAdjacentMines(row, col));
            }
        }
    }
}

function newGame() {
    initField();
    printField();
}

function countAdjacentMines(row, col) {
    //return pocet min, ktore su okolo danej pozicie
    let numberOfAdjacentMines = 0;
    // test 0,0 je ok, lebo pre miny to neratame
    [-1, 0, 1].forEach(r => {
        [-1, 0, 1].forEach(c => {
            if (row + r >= 0 && row + r < rowCount
                && col + c >= 0 && col + c < colCount
                && field[row + r][col + c] instanceof Mine) {
                numberOfAdjacentMines++;
            }
        })
    });
    return numberOfAdjacentMines;
}

//vola sa to cez konzolu
function openTile(row, col) {
    // otvori dlazidu na pozicii row, col vo field - nastavi jej stav na OPEN
    // iba pokial jej stav bol predtym CLOSED
    let tile = field[row][col];
    if (tile.state == StateEnum.CLOSED) {
        // test na vyhru/prehru
        if (isLost(row, col)) {
            console.log("Game over! You lost!");
            remainingMines(row, col);
        }

        if (isWon()) {
            console.log("Congratulation! You won!!!");
        }

        tile.state = StateEnum.OPEN;
        if (tile.value == 0) {
            openAdjacentTiles(row, col);
        }
    }
    printField();
}

//vola sa to cez konzolu
function markTile(row, col) {
    // markne dlazdicu ked je CLOSED
    // nastavi CLOSED, pokial bola predtym MARKED
    let tile = field[row][col];
    if (tile.state == StateEnum.CLOSED) {
        tile.state = StateEnum.MARKED;
    } else if (tile.state == StateEnum.MARKED) {
        tile.state = StateEnum.CLOSED;
    }
    printField();
}

function openAdjacentTiles(row, col) {
    [-1, 0, 1].forEach(r => {
        [-1, 0, 1].forEach(c => {
            if (row + r >= 0 && row + r < field.length && col + c >= 0 && col + c < field.length) {
                openTile(row + r, col + c);
            }
        })
    });
}

function isLost(row, col) {
    let tile = field[row][col];
    if (tile instanceof Mine) {
        return true;
    }
}

function isWon() {
    let numberOfOpenTiles = 1;
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (field[row][col].state == StateEnum.OPEN) {
                numberOfOpenTiles++;
            }
        }
    }
    let numAllTiles = rowCount * colCount;
    console.log("pocet otvorenych: " + numberOfOpenTiles);
    console.log("pocet vsetkych: " + numAllTiles);
    if (numberOfOpenTiles == (numAllTiles - mineCount)) {
        return true;
    } else {
        return false;
    }
}

function remainingMines(myRow, myCol) {
    if (isLost(myRow, myCol)) {
        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < colCount; col++) {
                if (field[row][col] instanceof Mine) {
                    field[row][col].state = StateEnum.OPEN;
                }
            }
        }
    }
}



