///////////////////////////////////////Finding possible placements section/////////////////////////

$(document).ready(initiateOthello);

function initiateOthello(){
    $('.cells').on('click',chipPlacement)
}

var player=0;
var blackPlayerStack=32;
var whitePlayerStack=32;

function chipPlacement(){
    var coordinates = {row: $(this).attr('row'), col: $(this).attr('col')};
    var blackChip = $('<div>',{
        'class':'black'
    });
    var whiteChip = $('<div>',{
        'class':'white'
    });
    if(player===0){
        $(this).append(blackChip);
        player+=1;
        blackPlayerStack-=1;
        console.log(blackPlayerStack)
    }else{
        $(this).append(whiteChip);
        player-=1;
        whitePlayerStack-=1;
        console.log(whitePlayerStack)
    }
    return coordinates;
}

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
