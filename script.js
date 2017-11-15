///////////////////////////////////////Finding possible placements section/////////////////////////
var gameArr = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, 1, 0, null, null, null],
    [null, null, null, 0, 1, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];


function findPossiblePlacements() {
    if (player === 0) {
        var otherPlayer = 1;
    } else {
        var otherPlayer = 0;
    }

    var possiblePlacementArr = [];

    for (var i=0; i<gameArr.length; i++) {
        for (var j=0; j<gameArr[i].length; j++) {
            if (gameArr[i][j] === player) {
                if (gameArr[i-1][j] === otherPlayer) {
                    //top
                    for (var q=2; q<gameArr.length;q++) {
                        if (gameArr[i-q][j] === null) {
                            possiblePlacementArr.push([(i-q),j]);
                            break;
                        }
                        else if (gameArr[i-q][j] === player) {
                            break;
                        }
                    }

                }
                if (gameArr[i-1][j+1] === otherPlayer) {
                    //top right
                    for (var q=2; q<gameArr.length;q++) {
                        if (gameArr[i-q][j+q] === null) {
                            possiblePlacementArr.push([(i-q),(j+q)]);
                            break;
                        }
                        else if (gameArr[i-q][j+q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i][j+1] === otherPlayer) {
                    //right
                    for(var q=2;q<gameArr.length; q++) {
                        if (gameArr[i][j+q] === null) {
                            possiblePlacementArr.push([i,(j+q)]);
                            break;
                        }
                        else if (gameArr[i][j+q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i+1][j+1] === otherPlayer) {
                    //bottom right
                    for (var q=2; q<gameArr.length; q++) {
                        if (gameArr[i+q][j+q] === null) {
                            possiblePlacementArr.push([(i+q),(j+q)]);
                            break;
                        }
                        else if (gameArr[i+q][j+q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i+1][j] === otherPlayer) {
                    //bottom
                    for (var q=2; q<gameArr.length; q++) {
                        if (gameArr[i+q][j] === null) {
                            possiblePlacementArr.push([(i+q),j]);
                            break;
                        }
                        else if (gameArr[i+q][j] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i+1][j-1] === otherPlayer) {
                    //bottom left
                    for (var q=2; q<gameArr.length; q++) {
                        if (gameArr[i+q][j-q] === null) {
                            possiblePlacementArr.push([(i+q),j-q]);
                        }
                        else if (gameArr[i+q][j-q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i][j-1] === otherPlayer) {
                    //left
                    for (var q=2; q<gameArr.length; q++) {
                        if (gameArr[i][j-q] === null) {
                            possiblePlacementArr.push([i,(j-q)]);
                            break;
                        }
                        else if (gameArr[i][j-q] === player) {
                            break;
                        }
                    }
                }
                if (gameArr[i-1][j-1] === otherPlayer) {
                    //top left
                    for (var q=2; q<gameArr.length; q++) {
                        if (gameArr[i-q][j-q] === null) {
                            possiblePlacementArr.push([(i-q),(j-q)]);
                            break;
                        }
                        else if (gameArr[i-q][j-q] === player) {
                            break;
                        }
                    }
                }
            }
        }
    }
    return possiblePlacementArr;
}
console.log(findPossiblePlacements());
///////////////////////////////////////Finding possible placements section/////////////////////////
