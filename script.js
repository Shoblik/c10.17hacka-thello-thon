
function doFlips(coordinates) {
    
        var row = coordinates.row;
        var col = coordinates.col;
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
    
    
        for (var a = row + 1; a <= 7; a++) {
            //checks down row
    
            if (gameArr[a][col] === search) {
                //finds endpoint and flips inbetween
                if (checkDown === true) {
    
                    for (var b = row; b <= i; b++) {
                        gameArr[b][col] = search;
                    }
                    checkDown = false;
                }
    
            }
        }
    
        for (var c = row - 1; c >= 0; c--) {
            //checks up row
            if (gameArr[c][col] === search) {
                //finds endpoint and flips inbetween
                if (checkUp === true) {
                    for (var d = row; d >= c; d--) {
                        gameArr[d][col] = search;
                    }
                    checkUp = false;
                }
    
            }
        }
        for (var i = col + 1; i <= 7; i++) {
            //checks right
            if (gameArr[row][i] === search) {
                //find right endpoint and flip chips in between
                if (checkRight === true) {
                    for (var k = col; k <= i; k++) {
                        gameArr[row][k] = search;
                    }
                    checkRight = false;
                }
    
    
            }
    
    
            var diagRowBegin = row + 1;
            var diagColBegin = col + 1;
    
            if (countInc <= 7 && gameArr[countInc][i] === search) {
                //row -> countInc and col -> i = endpoint
                //console.log('row increment conditional')
                if (checkRightInc === true) {
                    diagRowBegin = row + 1;
                    diagColBegin = col + 1;
                    for (diagRowBegin; diagRowBegin < countInc; diagRowBegin++, diagColBegin++) {
    
                        gameArr[diagRowBegin][diagColBegin] = search;
                    }
                    checkRightInc = false;
                }
    
            }
    
            countInc++;
    
            //row decrement
            if (countDec >= 0 && gameArr[countDec][i] === search) {
    
                if (checkRightDec === true) {
                    diagRowBegin = row - 1;
                    diagColBegin = col + 1;
    
                    for (diagRowBegin; diagRowBegin > countDec; diagRowBegin--, diagColBegin++) {
    
                        gameArr[diagRowBegin][diagColBegin] = search;
                    }
                    checkRightDec = false;
                }
    
    
            }
            countDec--;
        }
    
    
        console.log('countInc: ' + countInc);
        for (var j = col - 1; j >= 0; j--) {
            //checks left
    
            if (checkLeft === true) {
                if (gameArr[row][j] === search) {
                    for (var z = col; z >= j; z--) {
                        gameArr[row][z] = search;
                    }
    
                    checkLeft = false;
                }
    
            }
    
    
            var diagRowBeginLeft = row + 1;
            var diagColBeginLeft = col - 1;
    
            //row increment  
            if (countIncLeft <= 7 && gameArr[countIncLeft][j] === search) {
                if (checkLeftInc === true) {
                    diagRowBeginLeft = row + 1;
                    diagColBeginLeft = col - 1;
    
                    for (diagRowBeginLeft; diagRowBeginLeft < countIncLeft; diagRowBeginLeft++, diagColBeginLeft--) {
    
                        gameArr[diagRowBeginLeft][diagColBeginLeft] = search;
                    }
                    checkLeftInc = false;
                }
    
    
            }
    
            countIncLeft++;
    
            //row decrement
            if (countDecLeft >= 0 && gameArr[countDecLeft][j] === search) {
    
                if (checkLeftDec === true) {
                    diagRowBeginLeft = row - 1;
                    diagColBeginLeft = col - 1;
                    for (diagRowBeginLeft; diagRowBeginLeft > countDecLeft; diagRowBeginLeft--, diagColBeginLeft--) {
    
                        gameArr[diagRowBeginLeft][diagColBeginLeft] = search;
                    }
    
                    checkLeftDec = false;
                }
    
            }
            countDecLeft--;
        }
    
        console.log(gameArr);
    
    }
    