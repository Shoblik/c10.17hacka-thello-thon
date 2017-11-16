$(document).ready(initiateOthello);

function initiateOthello() {
    $('.cell').on('click', chipPlacement);
    findPossiblePlacements();
    playerTurn();
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
var blackPlayer = new Player('black');
var whitePlayer = new Player('white');
var currentChipsOnBoard= 4;
var reset=false;
function Player(color) {
    this.chipStack = 30;
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
        currentChipsOnBoard+=1;
        if (player === 0) {
            $(this).append($('<div>', {
                'class': blackPlayer.chipColor
            }));
            
            gameArr[parseFloat(coordinates.row)][parseFloat(coordinates.col)] = 0;
            doFlips(coordinates);
            player += 1;
            blackPlayer.chipStack -= 1;
        } else {
            $(this).append($('<div>', {
                'class': whitePlayer.chipColor
            }));
            gameArr[parseFloat(coordinates.row)][parseFloat(coordinates.col)] = 1;
            doFlips(coordinates);
            player -= 1;
            whitePlayer.chipStack -= 1;
        }
        playerTurn();
        updateChipReserve();
        turnoffValidPlacementHint();
        findPossiblePlacements();
        return coordinates;
    } else {
        console.log('not a legal move')
    }

}
function updateChipReserve(){
    $('.black-reserve >span').text(blackPlayer.chipStack);
    $('.white-reserve >span').text(whitePlayer.chipStack);
}

function findPossiblePlacements() {
    if (player === 0) {
        var otherPlayer = 1;
    } else {
        var otherPlayer = 0;
    }

    var possiblePlacementArr = [];

    for (var i = 0; i < gameArr.length-1; i++) {
        for (var j = 0; j < gameArr[i].length-1; j++) {
            if (gameArr[i][j] === player) {
                if (i > 1) {
                    if (gameArr[i - 1][j] === otherPlayer) {
                        //top
                        for (var q = 2; q < gameArr.length-1; q++) {
                            if (i-q >= 0) {
                                if (gameArr[i - q][j] === null) {
                                    possiblePlacementArr.push([(i - q), j]);
                                    break;
                                } else if (gameArr[i - q][j] === player) {
                                    break;
                                }
                            }
                            else{break;}
                        }

                    }
                }
                if (i > 1 && j < 6) {
                    if (gameArr[i - 1][j + 1] === otherPlayer) {
                        //top right
                        for (var q = 2; q < gameArr.length-1; q++) {
                            if (i-q >= 0 && j+q <= 7) {
                                if (gameArr[i - q][j + q] === null) {
                                    possiblePlacementArr.push([(i - q), (j + q)]);
                                    break;
                                }
                                else if (gameArr[i - q][j + q] === player) {
                                    break;
                                }
                            }
                            else {break;}
                        }
                    }
                }
                if (j < 6) {
                    if (gameArr[i][j + 1] === otherPlayer) {
                        //right
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (j+q <= 7) {
                                if (gameArr[i][j + q] === null) {
                                    possiblePlacementArr.push([i, (j + q)]);
                                    break;
                                } else if (gameArr[i][j + q] === player) {
                                    break;
                                }
                            }
                            else {break;}
                        }
                    }
                }
                if (i<6 && j < 6) {
                    if (gameArr[i + 1][j + 1] === otherPlayer) {
                        //bottom right
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (j+q <= 7  && i + q <= 7) {
                                if (gameArr[i + q][j + q] === null) {
                                    possiblePlacementArr.push([(i + q), (j + q)]);
                                    break;
                                } else if (gameArr[i + q][j + q] === player) {
                                    break;
                                }
                            }
                            else {break;}
                        }
                    }
                }
                if (i < 6) {
                    if (gameArr[i + 1][j] === otherPlayer) {
                        //bottom
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (i+q <= 7) {
                                if (gameArr[i + q][j] === null) {
                                    possiblePlacementArr.push([(i + q), j]);
                                    break;
                                } else if (gameArr[i + q][j] === player) {
                                    break;
                                }
                            }
                            else {break;}
                        }
                    }
                }
                if (i<6 && j > 1) {
                    if (gameArr[i + 1][j - 1] === otherPlayer) {
                        //bottom left
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (j-q >= 0 && i + q <= 7) {
                                if (gameArr[i + q][j - q] === null) {
                                    possiblePlacementArr.push([(i + q), j - q]);
                                    break;
                                } else if (gameArr[i + q][j - q] === player) {
                                    break;
                                }
                            }
                            else {break;}
                        }
                    }
                }
                if (j > 1) {
                    if (gameArr[i][j - 1] === otherPlayer) {
                        //left
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (j-q >= 0) {
                                if (gameArr[i][j - q] === null) {
                                    possiblePlacementArr.push([i, (j - q)]);
                                    break;
                                } else if (gameArr[i][j - q] === player) {
                                    break;
                                }
                            }
                            else {break;}
                        }
                    }
                }
                if (i > 1 && j > 1) {
                    if (gameArr[i - 1][j - 1] === otherPlayer) {
                        //top left
                        for (var q = 2; q < gameArr.length-1; q++) {
                            if (i-q >= 0 && j - q >= 0) {
                                if (gameArr[i - q][j - q] === null) {
                                    possiblePlacementArr.push([(i - q), (j - q)]);
                                    break;
                                } else if (gameArr[i - q][j - q] === player) {
                                    break;
                                }
                            }
                            else {break;}
                        }
                    }
                }
            }
        }
    }
    winCheck();
    if(possiblePlacementArr.length===0){
            if(player===0){
                blackPlayer.validTurn=false;
                player+=1;
                findPossiblePlacements();
            }else {
                whitePlayer.validTurn = false;
                player -= 1;
            }
                findPossiblePlacements();
        }else{
            if(player===0){
                blackPlayer.validTurn=true;
            }else{
                whitePlayer.validTurn=true;
            }
        }
    validPlacement(possiblePlacementArr);
}

function chipCounter(arr) { //this'll after flip function
    var counterObj = {
        blackCount: 0,
        whiteCount: 0
    };
    for (var i = 0; i < arr.length; i++) {
        for (var p = 0; p < arr[i].length; p++) {
            if (arr[i][p] === 0) {
                counterObj.blackCount += 1;
            } else if (arr[i][p] === 1) {
                counterObj.whiteCount += 1
            }
        }
    }
    updateChipsBar(counterObj);
    return counterObj;
}
function updateChipsBar(chipCount){
    var barProgressPercent = (chipCount.blackCount/currentChipsOnBoard)*100;
    $('.blackDivProgress').css('width', barProgressPercent+"%");
    $('.whiteScore > span').text(chipCount.whiteCount);
    $('.blackScore > span').text(chipCount.blackCount);

}
function winCheck() {
    var currentCounter = chipCounter(gameArr); //returns an object with whiteCount and blackCount
    if (blackPlayer.chipStack === 0 && whitePlayer.chipStack === 0) {
        if (currentCounter.blackCount > currentCounter.whiteCount) {
            console.log('black wins')
        } else {
            console.log('white wins')
        }
        resetGame();
    }
    if(!blackPlayer.validTurn && !whitePlayer.validTurn){
        if (currentCounter.blackCount > currentCounter.whiteCount) {
            console.log('black wins')
        } else {
            console.log('white wins')
        }
        resetGame();
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
    var rowInc = row + 1;
    var rowDec = row - 1;
    var colInc = col + 1;
    var colDec = col - 1;

    if (rowInc > 7) {
        rowInc = 7;
    }

    if (rowDec < 0) {
        rowDec = 0;
    }

    if (colInc > 7) {
        colInc = 7;
    }

    if (colDec < 0) {
        colDec = 0;
    }

    if (gameArr[rowInc][col] === search || gameArr[rowInc][col] === null) {
        checkDown = false;
    }

    if (gameArr[rowDec][col] === search || gameArr[rowDec][col] === null) {
        checkUp = false;
    }

    if (gameArr[row][colInc] === search || gameArr[row][colInc] === null) {
        checkRight = false;
    }

    if (gameArr[row][colDec] === search || gameArr[row][colDec] === null) {
        checkLeft = false;
    }
    if (gameArr[rowInc][colInc] === search || gameArr[rowInc][colInc] === null) {
        checkRightInc = false;
    }
    if (gameArr[rowDec][colInc] === search || gameArr[rowDec][colInc] === null) {
        checkRightDec = false;
    }

    if (gameArr[rowInc][colDec] === search || gameArr[rowInc][colDec] === null) {
        checkLeftInc = false;
    }
    if (gameArr[rowDec][colDec] === search || gameArr[rowDec][colDec] === null) {
        checkLeftDec = false;
    }



    for (var a = row + 1; a <= 7; a++) {
        //checks down row
        if (checkDown === true && gameArr[a][col] === search) {
            //finds endpoint and flips inbetween
            for (var b = row; b <= a; b++) {
                if(gameArr[b][col] === null || gameArr[b+1][col] === null) {
                    checkDown = false;
                }
                if(checkDown === true && gameArr[b][col] != null) {
                    gameArr[b][col] = search;
                }   
            }
            checkDown = false;
        }
    }

    for (var c = row - 1; c >= 0; c--) {
        //checks up row
        if (checkUp === true && gameArr[c][col] === search) {
            //finds endpoint and flips inbetween
            for (var d = row; d >= c; d--) {
                if(gameArr[d][col]=== null || gameArr[d-1][col]=== null) {
                    checkUp = false;
                }
                
                if(checkUp === true && gameArr[d][col] != null) {
                    gameArr[d][col] = search;
                }   
            }
            checkUp = false;
        }

    }
    for (var i = col + 1; i <= 7; i++) {
        //checks right
        if (checkRight === true && gameArr[row][i] === search) {
            //find right endpoint and flip chips in between

            for (var k = col; k <= i; k++) {
                
                if(gameArr[row][k] === null || gameArr[row][k+1] === null) {
                    checkRight = false;
                }
                
                if(checkRight === true && gameArr[row][k] != null) {
                    gameArr[row][k] = search;
                }
                
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
                
                if(gameArr[diagRowBegin][diagColBegin]=== null ||gameArr[diagRowBegin+1][diagColBegin+1]=== null) {
                    checkRightInc = false;
                }
                
                if(checkRightInc === true && gameArr[diagRowBegin][diagColBegin] != null) {
                      gameArr[diagRowBegin][diagColBegin] = search;
                } 
            }
            checkRightInc = false;

        }

        countInc++;

        //row decrement
        if (checkRightDec === true && countDec >= 0 && gameArr[countDec][i] === search) {

            diagRowBegin = row - 1;
            diagColBegin = col + 1;

            for (diagRowBegin; diagRowBegin > countDec; diagRowBegin--, diagColBegin++) {
                if(gameArr[diagRowBegin][diagColBegin] === null || gameArr[diagRowBegin-1][diagColBegin+1] === null) {
                    checkRightDec = false;
                }
                
                if(checkRightDec === true && gameArr[diagRowBegin][diagColBegin] != null) {
                     gameArr[diagRowBegin][diagColBegin] = search;
                }
               
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
                if(gameArr[row][z] === null || gameArr[row][z-1] === null) {
                    checkLeft = false;
                }
                if(checkLeft === true && gameArr[row][z] != null) {
                gameArr[row][z] = search; 
                }
                
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
                
                if(gameArr[diagRowBeginLeft][diagColBeginLeft] === null || gameArr[diagRowBeginLeft+1][diagColBeginLeft-1] === null) {
                    checkLeftInc = false;
                }
                if(checkLeftInc === true && gameArr[diagRowBeginLeft][diagColBeginLeft] != null) {
                   gameArr[diagRowBeginLeft][diagColBeginLeft] = search; 
                }
                
            }

            checkLeftInc = false;
        }

        countIncLeft++;

        //row decrement
        if (checkLeftDec === true && countDecLeft >= 0 && gameArr[countDecLeft][j] === search) {


            diagRowBeginLeft = row - 1;
            diagColBeginLeft = col - 1;
            for (diagRowBeginLeft; diagRowBeginLeft > countDecLeft; diagRowBeginLeft--, diagColBeginLeft--) {
                
                if(gameArr[diagRowBeginLeft][diagColBeginLeft] === null || gameArr[diagRowBeginLeft-1][diagColBeginLeft-1] === null) {
                 checkLeftDec = false;   
                }
                if(checkLeftDec === true && gameArr[diagRowBeginLeft][diagColBeginLeft] != null) {
                  gameArr[diagRowBeginLeft][diagColBeginLeft] = search;  
                }
                
            }

            checkLeftDec = false;

        }
        countDecLeft--;
    }
    console.log(gameArr);
    updateDOMGameBoard();
}

function updateDOMGameBoard() {
    var rows = $('.row');

    for (var i = 0; i < gameArr.length; i++) {
        for (var j = 0; j < gameArr[0].length; j++) {
            var selectedCell = $(rows[i]).find('[col=' + j + ']');
            if (gameArr[i][j] === 0) {
                selectedCell.children().removeClass('white').addClass('black');
            } else if (gameArr[i][j] === 1) {
                selectedCell.children().removeClass('black').addClass('white');
            }
        }
    }
    chipCounter(gameArr);
}
function playerTurn(){
    if(player===0){
        $('.cowboy').addClass('playerTurn');
        $('.indian').removeClass('playerTurn')
    }else{
        $('.indian ').addClass('playerTurn');
        $('.cowboy').removeClass('playerTurn')
    }
}

function resetGame(){
    gameArr=[
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, 0, 1, null, null, null],
        [null, null, null, 1, 0, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
    ];
    turnoffValidPlacementHint();
    $('.cell').each(function(){
        $(this).empty()
    });
    var rows = $('.row');
    $(rows[3]).find("[col="+3+"]").append($('<div>',{'class':'black'}));
    $(rows[3]).find("[col="+4+"]").append($('<div>',{'class':'white'}));
    $(rows[4]).find("[col="+3+"]").append($('<div>',{'class':'white'}));
    $(rows[4]).find("[col="+4+"]").append($('<div>',{'class':'black'}));
    blackPlayer.chipStack=30;
    blackPlayer.validTurn=true;
    whitePlayer.validTurn=true;
    whitePlayer.chipStack=30;
    currentChipsOnBoard=4;
    chipCounter(gameArr);
    updateChipReserve();
    player=0;
    findPossiblePlacements();
}
