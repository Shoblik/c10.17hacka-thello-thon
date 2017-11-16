$(document).ready(initiateOthello);

function initiateOthello() {
    $('.cell').on('click', chipPlacement);
    findPossiblePlacements();
    playerTurn();
    $('header').on('click',hideStuff);
    $('.switch').on('click',switchModals);
    $('.close').on('click', closeModal)
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
var currentChipsOnBoard = 4;
var reset = false;

function Player(color) {
    this.chipStack = 30;
    this.validTurn = true;
    this.chipColor = color;
}


function chipPlacement(event) {
    var coordinates = {
        row: $(this).attr('row'),
        col: $(this).attr('col')
    };
    console.log(coordinates);

    if ($(this).hasClass('valid')) {
        currentChipsOnBoard += 1;
        if (player === 0) {
            $(this).append($('<div>', {
                'class': blackPlayer.chipColor
            }));

            gameArr[parseFloat(coordinates.row)][parseFloat(coordinates.col)] = 0;
            doFlips(coordinates);
            //
            popImg(event);
            setTimeout(function () {
                $('.popGun').fadeOut(1000, 'swing')
            }, 1000);
            //
            player += 1;
            blackPlayer.chipStack -= 1;
        } else {
            $(this).append($('<div>', {
                'class': whitePlayer.chipColor
            }));
            gameArr[parseFloat(coordinates.row)][parseFloat(coordinates.col)] = 1;
            doFlips(coordinates);
            //
            popImg(event);
            setTimeout(function () {
                $('.popAxe').fadeOut(250, 'swing')
            }, 500);
            //
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

function updateChipReserve() {
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

    for (var i = 0; i < gameArr.length - 1; i++) {
        for (var j = 0; j < gameArr[i].length - 1; j++) {
            if (gameArr[i][j] === player) {
                if (i > 1) {
                    if (gameArr[i - 1][j] === otherPlayer) {
                        //top
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (i - q >= 0) {
                                if (gameArr[i - q][j] === null) {
                                    possiblePlacementArr.push([(i - q), j]);
                                    break;
                                } else if (gameArr[i - q][j] === player) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }

                    }
                }
                if (i > 1 && j < 6) {
                    if (gameArr[i - 1][j + 1] === otherPlayer) {
                        //top right
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (i - q >= 0 && j + q <= 7) {
                                if (gameArr[i - q][j + q] === null) {
                                    possiblePlacementArr.push([(i - q), (j + q)]);
                                    break;
                                } else if (gameArr[i - q][j + q] === player) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (j < 6) {
                    if (gameArr[i][j + 1] === otherPlayer) {
                        //right
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (j + q <= 7) {
                                if (gameArr[i][j + q] === null) {
                                    possiblePlacementArr.push([i, (j + q)]);
                                    break;
                                } else if (gameArr[i][j + q] === player) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (i < 6 && j < 6) {
                    if (gameArr[i + 1][j + 1] === otherPlayer) {
                        //bottom right
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (j + q <= 7 && i + q <= 7) {
                                if (gameArr[i + q][j + q] === null) {
                                    possiblePlacementArr.push([(i + q), (j + q)]);
                                    break;
                                } else if (gameArr[i + q][j + q] === player) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (i < 6) {
                    if (gameArr[i + 1][j] === otherPlayer) {
                        //bottom
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (i + q <= 7) {
                                if (gameArr[i + q][j] === null) {
                                    possiblePlacementArr.push([(i + q), j]);
                                    break;
                                } else if (gameArr[i + q][j] === player) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (i < 6 && j > 1) {
                    if (gameArr[i + 1][j - 1] === otherPlayer) {
                        //bottom left
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (j - q >= 0 && i + q <= 7) {
                                if (gameArr[i + q][j - q] === null) {
                                    possiblePlacementArr.push([(i + q), j - q]);
                                    break;
                                } else if (gameArr[i + q][j - q] === player) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (j > 1) {
                    if (gameArr[i][j - 1] === otherPlayer) {
                        //left
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (j - q >= 0) {
                                if (gameArr[i][j - q] === null) {
                                    possiblePlacementArr.push([i, (j - q)]);
                                    break;
                                } else if (gameArr[i][j - q] === player) {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (i > 1 && j > 1) {
                    if (gameArr[i - 1][j - 1] === otherPlayer) {
                        //top left
                        for (var q = 2; q < gameArr.length - 1; q++) {
                            if (i - q >= 0 && j - q >= 0) {
                                if (gameArr[i - q][j - q] === null) {
                                    possiblePlacementArr.push([(i - q), (j - q)]);
                                    break;
                                } else if (gameArr[i - q][j - q] === player) {
                                    break;
                                }
                            } else {
                                break;
                            }
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
            }else {
                whitePlayer.validTurn = false;
                player -= 1;

            }
            if(whitePlayer.validTurn || blackPlayer.validTurn){
                player=0;
                findPossiblePlacements();
            }

        }else{
            if(player===0){
                blackPlayer.validTurn=true;
            }else{
                whitePlayer.validTurn=true;
            }
        validPlacement(possiblePlacementArr);
        }
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

function updateChipsBar(chipCount) {
    var barProgressPercent = (chipCount.blackCount / currentChipsOnBoard) * 100;
    $('.blackDivProgress').css('width', barProgressPercent + "%");
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
    if (!blackPlayer.validTurn && !whitePlayer.validTurn) {
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
    for (var i = 0; i < arr.length; i++) {
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

    //check one spot around spot clicked
    var rowInc = row + 1;
    var rowDec = row - 1;
    var colInc = col + 1;
    var colDec = col - 1;

    var rowIncLeft = rowInc;
    var rowDecLeft = rowDec;

    var diagRowBegin = null;
    var diagColBegin = null;

    if (rowInc > 7) {
        checkDown = false;
    } else if (gameArr[rowInc][col] === search || gameArr[rowInc][col] === null) {
        checkDown = false;
    }

    if (rowDec < 0) {
        checkUp = false;
    } else if (gameArr[rowDec][col] === search || gameArr[rowDec][col] === null) {
        checkUp = false;
    }

    if (colInc > 7) {
        checkRight = false;
    } else if (gameArr[row][colInc] === search || gameArr[row][colInc] === null) {
        checkRight = false;
    }


    if (colDec < 0) {
        checkLeft = false;
    } else if (gameArr[row][colDec] === search || gameArr[row][colDec] === null) {
        checkLeft = false;
    }

    if (rowInc > 7 || colInc > 7) {
        checkRightInc = false;
    } else if (gameArr[rowInc][colInc] === search || gameArr[rowInc][colInc] === null) {
        checkRightInc = false;
    }

    if (rowDec < 0 || colInc > 7) {
        checkRightDec = false;
    } else if (gameArr[rowDec][colInc] === search || gameArr[rowDec][colInc] === null) {
        checkRightDec = false;
    }


    if (rowInc > 7 || colDec < 0) {
        checkLeftInc = false;
    } else if (gameArr[rowInc][colDec] === search || gameArr[rowInc][colDec] === null) {
        checkLeftInc = false;
    }


    if (rowDec < 0 || colDec < 0) {
        checkLeftDec = false;
    } else if (gameArr[rowDec][colDec] === search || gameArr[rowDec][colDec] === null) {
        checkLeftDec = false;
    }

    for (var a = row + 1; a <= 7; a++) {
        //checks down row
        if (gameArr[a][col] === null) {
            checkDown = false;
        }
        if (checkDown === true && gameArr[a][col] === search) {
            var endIndex = a;
            //finds endpoint and flips inbetween
            for (var b = row + 1; b < endIndex; b++) {
                gameArr[b][col] = search;
                updateDOMGameBoard(b, col)
            }
            checkDown = false;
        }
    }

    for (var c = row - 1; c >= 0; c--) {
        //checks up row
        if (gameArr[c][col] === null) {
            checkUp = false;
        }
        if (checkUp === true && gameArr[c][col] === search) {
            //finds endpoint and flips inbetween
            endIndex = c;
            for (var d = row - 1; d > endIndex; d--) {
                gameArr[d][col] = search;
                updateDOMGameBoard(d, col);
            }
            checkUp = false;
        }
    }
    for (var i = col + 1; i <= 7; i++) {
        //checks right

        if (gameArr[row][i] === null) {
            checkRight = false;
        }
        if (checkRight === true && gameArr[row][i] === search) {
            //find right endpoint and flip chips in between
            endIndex = i;
            for (var k = col + 1; k < endIndex; k++) {
                gameArr[row][k] = search
                updateDOMGameBoard(row, k)
            }

            checkRight = false;
        }

        //row increment
        if (rowInc <= 7 && gameArr[rowInc][i] === null) {
            checkRightInc = false;
        }
        if (checkRightInc === true && rowInc < 7 && gameArr[rowInc][i] === search) {

            diagRowBegin = row + 1;
            diagColBegin = col + 1;
            for (diagRowBegin; diagRowBegin < rowInc; diagRowBegin++, diagColBegin++) {
                gameArr[diagRowBegin][diagColBegin] = search;
                updateDOMGameBoard(diagRowBegin, diagColBegin);
            }
            checkRightInc = false;
        }

        rowInc++;

        //row decrement
        if (rowDec >= 0 && gameArr[rowDec][i] === null) {
            checkRightDec = false;
        }
        if (checkRightDec === true && rowDec >= 0 && gameArr[rowDec][i] === search) {

            diagRowBegin = row - 1;
            diagColBegin = col + 1;

            for (diagRowBegin; diagRowBegin > rowDec; diagRowBegin--, diagColBegin++) {

                gameArr[diagRowBegin][diagColBegin] = search;
                updateDOMGameBoard(diagRowBegin, diagColBegin);

            }
            checkLeftInc = false;
        }
        rowDec--;
    }

    for (var j = col - 1; j >= 0; j--) {
        //checks left
        if (gameArr[row][j] === null) {
            checkLeft = false;
        }

        if (checkLeft === true && gameArr[row][j] === search) {
            endIndex = j;
            for (var z = col - 1; z > endIndex; z--) {
                gameArr[row][z] = search;
                updateDOMGameBoard(row, z);

            }
            checkLeft = false;

        }


        diagRowBegin = row + 1;
        diagColBegin = col - 1;

        //row increment
        if (rowIncLeft <= 7 && gameArr[rowIncLeft][j] === null) {
            checkLeftInc = false;
        }
        if (checkLeftInc === true && rowIncLeft < 7 && gameArr[rowIncLeft][j] === search) {

            diagRowBegin = row + 1;
            diagColBegin = col - 1;

            for (diagRowBegin; diagRowBegin < rowIncLeft; diagRowBegin++, diagColBegin--) {

                gameArr[diagRowBegin][diagColBegin] = search;
                updateDOMGameBoard(diagRowBegin, diagColBegin);
            }

            checkLeftInc = false;
        }

        rowIncLeft++;

        //row decrement
        if (rowDecLeft >= 0 && gameArr[rowDecLeft][j] === null) {
            checkLeftDec = false;
        }
        if (checkLeftDec === true && rowDecLeft > 0 && gameArr[rowDecLeft][j] === search) {


            diagRowBegin = row - 1;
            diagColBegin = col - 1;
            for (diagRowBegin; diagRowBegin > rowDecLeft; diagRowBegin--, diagColBegin--) {

                gameArr[diagRowBegin][diagColBegin] = search;
                updateDOMGameBoard(diagRowBegin, diagColBegin);
            }

            checkLeftDec = false;

        }
        rowDecLeft--;
    }
    console.log(gameArr);
    updateDOMGameBoard();
}


function updateDOMGameBoard(row, col) {
    if (player === 0) {
        $($('.row')[row]).find('[col=' + col + ']').children().removeClass('white').addClass('black');
    } else if (player === 1) {
        $($('.row')[row]).find('[col=' + col + ']').children().removeClass('black').addClass('white');
    }
    chipCounter(gameArr);
}

function playerTurn() {
    if (player === 0) {
        $('.cowboy').addClass('playerTurn');
        $('.indian').removeClass('playerTurn')
    } else {
        $('.indian ').addClass('playerTurn');
        $('.cowboy').removeClass('playerTurn')
    }
}

function resetGame() {
    gameArr = [
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
    $('.cell').each(function () {
        $(this).empty()
    });
    var rows = $('.row');
    $(rows[3]).find("[col=" + 3 + "]").append($('<div>', {
        'class': 'black'
    }));
    $(rows[3]).find("[col=" + 4 + "]").append($('<div>', {
        'class': 'white'
    }));
    $(rows[4]).find("[col=" + 3 + "]").append($('<div>', {
        'class': 'white'
    }));
    $(rows[4]).find("[col=" + 4 + "]").append($('<div>', {
        'class': 'black'
    }));
    blackPlayer.chipStack = 30;
    blackPlayer.validTurn = true;
    whitePlayer.validTurn = true;
    whitePlayer.chipStack = 30;
    currentChipsOnBoard = 4;
    chipCounter(gameArr);
    updateChipReserve();
    player = 0;
}

function popImg(event) {
    var mouseX = event.clientX - 150;
    var mouseY = event.clientY - 120;
    var leftPx = mouseX + 'px';
    var topPx = mouseY + 'px';

    if (player === 0) {
        var assetSrc = 'assets/gun.png';
        var assetClass = "<img class='popGun'>";
        var assetClassSelect = '.popGun';

        $('body').append($(assetClass).attr("src", assetSrc));
        $(assetClassSelect).css('left', leftPx);
        $(assetClassSelect).css('top', topPx);

        setTimeout(function () {
            $('.popGun').attr('src', 'assets/gun-bang.png')
        }, 150);

    } else if (player === 1) {
        assetSrc = 'assets/tomahawk-L.png';
        assetClass = "<img class='popAxe'>";
        assetClassSelect = '.popAxe';

        $('body').append($(assetClass).attr("src", assetSrc));
        $(assetClassSelect).css('left', leftPx);
        $(assetClassSelect).css('top', topPx);
    }
}
function hideStuff(){
    $('.board-container').toggleClass('shrink');
    $('.side').toggleClass('collapse')

}
function switchModals(){
    var parent= $(this).parent();
    if($(this).hasClass('about')){
        $('.dev').toggleClass('hideRight');
        if(parent.hasClass('rules')){
            parent.toggleClass('hideTop')
        }else{
            parent.toggleClass('hideLeft')
        }
    }else if($(this).hasClass('setting')) {
        $('.settings').toggleClass('hideLeft');
        if (parent.hasClass('rules')) {
            parent.toggleClass('hideTop')
        }else{
            parent.toggleClass('hideRight')
        }
    }else{
        $('.rules').toggleClass('hideTop');
        if (parent.hasClass('settings')) {
            parent.toggleClass('hideLeft')
        }else{
            parent.toggleClass('hideRight')
        }
    }
}
function closeModal(){
    $('.introWrapper').css('top','-200%')
}
