$(document).ready(initiateOthello);

function initiateOthello() {
    $('.cell').on('click', chipPlacement);
    findPossiblePlacements();

}
var gameArr = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, 0, 1, null, null, null],
    [null, null, null, 1, 0, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
];

var player = 0;
var blackPlayerStack = 32;
var whitePlayerStack = 32;
var blackPlayer = new Player('black');
var whitePlayer = new Player('white');

function Player(color) {
    this.chipStack = 32;
    this.validTurn = true;
    this.chipColor = color;
}



function chipPlacement() {
    var coordinates = {
        row: $(this).attr('row'),
        col: $(this).attr('col')
    };
    console.log(coordinates);
    if ($(this).hasClass('valid')) {
        if (player === 0) {
            $(this).append($('<div>', {
                'class': blackPlayer.chipColor
            }));
            gameArr[parseFloat(coordinates.row)][parseFloat(coordinates.col)] = 0;
            doFlips(coordinates);
            player += 1;
            blackPlayer.chipStack -= 1;
            console.log(blackPlayer.chipStack)
        } else {
            $(this).append($('<div>', {
                'class': whitePlayer.chipColor
            }));
            gameArr[parseFloat(coordinates.row)][parseFloat(coordinates.col)] = 1;
            doFlips(coordinates);
            player -= 1;
            whitePlayer.chipStack -= 1;
            console.log(whitePlayer.chipStack)
        }
        turnoffValidPlacementHint();
        findPossiblePlacements();
        return coordinates;
    } else {
        console.log('not a legal move')
    }

}

function findPossiblePlacements() {
    if (player === 0) {
        var otherPlayer = 1;
    } else {
        var otherPlayer = 0;
    }

    var possiblePlacementArr = [];

    for (var i = 0; i < gameArr.length; i++) {
        for (var j = 0; j < gameArr[i].length; j++) {
            if (gameArr[i][j] === player) {
                if (gameArr[i - 1][j] === otherPlayer) {
                    //top
                    for (var q = 2; q < gameArr.length; q++) {
                        if (gameArr[i - q][j] === null) {
                            possiblePlacementArr.push([(i - q), j]);
                            break;
                        } else if (gameArr[i - q][j] === player) {
                            break;
                        }
                    }

                }
                if (gameArr[i - 1][j + 1] === otherPlayer) {
                    //top right
                    for (var q = 2; q < gameArr.length; q++) {
                        if (gameArr[i - q][j + q] === null) {
                            possiblePlacementArr.push([(i - q), (j + q)]);
                            break;
                        } else if (gameArr[i - q][j + q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i][j + 1] === otherPlayer) {
                    //right
                    for (var q = 2; q < gameArr.length; q++) {
                        if (gameArr[i][j + q] === null) {
                            possiblePlacementArr.push([i, (j + q)]);
                            break;
                        } else if (gameArr[i][j + q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i + 1][j + 1] === otherPlayer) {
                    //bottom right
                    for (var q = 2; q < gameArr.length; q++) {
                        if (gameArr[i + q][j + q] === null) {
                            possiblePlacementArr.push([(i + q), (j + q)]);
                            break;
                        } else if (gameArr[i + q][j + q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i + 1][j] === otherPlayer) {
                    //bottom
                    for (var q = 2; q < gameArr.length; q++) {
                        if (gameArr[i + q][j] === null) {
                            possiblePlacementArr.push([(i + q), j]);
                            break;
                        } else if (gameArr[i + q][j] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i + 1][j - 1] === otherPlayer) {
                    //bottom left
                    for (var q = 2; q < gameArr.length; q++) {
                        if (gameArr[i + q][j - q] === null) {
                            possiblePlacementArr.push([(i + q), j - q]);
                        } else if (gameArr[i + q][j - q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i][j - 1] === otherPlayer) {
                    //left
                    for (var q = 2; q < gameArr.length; q++) {
                        if (gameArr[i][j - q] === null) {
                            possiblePlacementArr.push([i, (j - q)]);
                            break;
                        } else if (gameArr[i][j - q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i - 1][j - 1] === otherPlayer) {
                    //top left
                    for (var q = 2; q < gameArr.length; q++) {
                        if (gameArr[i - q][j - q] === null) {
                            possiblePlacementArr.push([(i - q), (j - q)]);
                            break;
                        } else if (gameArr[i - q][j - q] === player) {
                            break;
                        }
                    }
                }
            }
        }
    }
    validPlacement(possiblePlacementArr);
}

function chipCounter(arr) { //this'll after flip function
    var counterObj = {
        blackCount: 0,
        whiteCount: 0
    };
    for (i = 0; i < arr.length; i++) {
        for (p = 0; p < arr[i].length; p++) {
            if (arr[i][p] === 0) {
                counterObj.blackCount += 1;
            } else if (arr[i][p] === 1) {
                counterObj.whiteCount += 1
            }
        }
    }
    return counterObj;
}

function winCheck() {
    var currentCounter = chipCounter(gameArr); //returns an object with whiteCount and blackCount
    if (blackPlayerStack === 0 && whitePlayerStack === 0 || !blackPlayer.validTurn && !whitePlayer.validTurn) {
        if (currentCounter.blackCount > currentCounter.whiteCount) {
            console.log('black wins')
        } else {
            console.log('white wins')
        }
    }
}

function turnoffValidPlacementHint() {
    $('.cell').each(function () {
        $(this).removeClass('valid')
    })
}

function validPlacement(arr) { //gets array from possible placement function containing coordinates that that'll added a class of valid;
    for (i = 0; i < arr.length; i++) {
        var row = arr[i][0];
        var col = arr[i][1];
        var rows = $('.row');
        $(rows[row]).find("[col=" + col + "]").addClass("valid");
    }
}
console.log(findPossiblePlacements());



function doFlips(coordinates) {

    var row = parseInt(coordinates.row);
    var col = parseInt(coordinates.col);
    var search = null;

    console.log('gameArrIn: ' + gameArr[row][col]);

    if (player === 0) {
        //search for 0 endpoints
        search = 0;
        //flip = 0;
        console.log('search: ' + search);
    } else if (player === 1) {
        //search for 1 endpoint
        search = 1;
        //flip = 0;
        console.log('search: ' + search);
    }


    var checkUp = true;
    var checkDown = true;
    var checkLeft = true;
    var checkLeftInc = true;
    var checkLeftDec = true;
    var checkRight = true;
    var checkRightInc = true;
    var checkRightDec = true;

    var countInc = row + 1;
    var countDec = row - 1;
    var countIncLeft = row + 1;
    var countDecLeft = row - 1;

    //check one spot around spot clicked
    if (gameArr[row + 1][col] === search || gameArr[row + 1][col] === null) {
        checkDown = false;
    }

    if (gameArr[row - 1][col] === search || gameArr[row - 1][col] === null) {
        checkUp = false;
    }

    if (gameArr[row][col + 1] === search || gameArr[row][col + 1] === null) {
        checkRight = false;
    }

    if (gameArr[row][col - 1] === search || gameArr[row][col - 1] === null) {
        checkLeft = false;
    }
    if (gameArr[row + 1][col + 1] === search || gameArr[row + 1][col + 1] === null) {
        checkRightInc = false;
    }
    if (gameArr[row + 1][col - 1] === search || gameArr[row + 1][col - 1] === null) {
        checkRightDec = false;
    }

    if (gameArr[row + 1][col - 1] === search || gameArr[row + 1][col - 1] === null) {
        checkLeftInc = false;
    }
    if (gameArr[row - 1][col - 1] === search || gameArr[row - 1][col - 1] === null) {
        checkLeftDec = false;
    }



    for (var a = row + 1; a <= 7; a++) {
        //checks down row

        if (checkDown === true && gameArr[a][col] === search) {
            //finds endpoint and flips inbetween
            for (var b = row; b <= i; b++) {
                gameArr[b][col] = search;
            }
         checkDown = false;   
        }
    }

    for (var c = row - 1; c >= 0; c--) {
        //checks up row
        if (checkUp === true && gameArr[c][col] === search) {
            //finds endpoint and flips inbetween
            for (var d = row; d >= c; d--) {
                gameArr[d][col] = search;
            }
            checkUp = false;
        }
        
    }
    for (var i = col + 1; i <= 7; i++) {
        //checks right
        if (checkRight === true && gameArr[row][i] === search) {
            //find right endpoint and flip chips in between

            for (var k = col; k <= i; k++) {
                gameArr[row][k] = search;
            }

            checkRight = false;
        }


        var diagRowBegin = row + 1;
        var diagColBegin = col + 1;

        if (checkRightInc === true && countInc <= 7 && gameArr[countInc][i] === search) {
            //row -> countInc and col -> i = endpoint
            //console.log('row increment conditional')

            diagRowBegin = row + 1;
            diagColBegin = col + 1;
            for (diagRowBegin; diagRowBegin < countInc; diagRowBegin++, diagColBegin++) {

                gameArr[diagRowBegin][diagColBegin] = search;
            }
            checkRightInc = false;

        }

        countInc++;

        //row decrement
        if (checkRightDec === true && countDec >= 0 && gameArr[countDec][i] === search) {

            diagRowBegin = row - 1;
            diagColBegin = col + 1;

            for (diagRowBegin; diagRowBegin > countDec; diagRowBegin--, diagColBegin++) {

                gameArr[diagRowBegin][diagColBegin] = search;
            }
            checkRightDec = false;


        }
        countDec--;
    }


    console.log('countInc: ' + countInc);
    for (var j = col - 1; j >= 0; j--) {
        //checks left


        if (checkLeft === true && gameArr[row][j] === search) {
            for (var z = col; z >= j; z--) {
                gameArr[row][z] = search;
            }
            checkLeft = false;

        }


        var diagRowBeginLeft = row + 1;
        var diagColBeginLeft = col - 1;

        //row increment
        if (checkLeftInc === true && countIncLeft <= 7 && gameArr[countIncLeft][j] === search) {

            diagRowBeginLeft = row + 1;
            diagColBeginLeft = col - 1;

            for (diagRowBeginLeft; diagRowBeginLeft < countIncLeft; diagRowBeginLeft++, diagColBeginLeft--) {

                gameArr[diagRowBeginLeft][diagColBeginLeft] = search;
            }

            checkLeftInc = false;
        }

        countIncLeft++;

        //row decrement
        if (checkLeftDec === true && countDecLeft >= 0 && gameArr[countDecLeft][j] === search) {


            diagRowBeginLeft = row - 1;
            diagColBeginLeft = col - 1;
            for (diagRowBeginLeft; diagRowBeginLeft > countDecLeft; diagRowBeginLeft--, diagColBeginLeft--) {

                gameArr[diagRowBeginLeft][diagColBeginLeft] = search;
            }

            checkLeftDec = false;

        }
        countDecLeft--;
    }

    console.log(gameArr);

}

function updateBoardChips(){

}