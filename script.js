
$(document).ready(initiateOthello);

function initiateOthello(){
    $('.cell').on('click',chipPlacement);
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

var player=0;
var blackPlayerStack=32;
var whitePlayerStack=32;
var blackPlayer = new Player('black');
var whitePlayer = new Player('white');

function Player(color){
    this.chipStack=32;
    this.validTurn=true;
    this.chipColor=color;
}



function chipPlacement(){
    var coordinates = {row: $(this).attr('row'), col: $(this).attr('col')};
    console.log(coordinates);
    if(player===0){
        $(this).append($('<div>',{
            'class': blackPlayer.chipColor
        }));
        gameArr[parseFloat(coordinates.row)][parseFloat(coordinates.col)]=0;
        player+=1;
        blackPlayer.chipStack-=1;
        console.log(blackPlayer.chipStack)
    }else{
        $(this).append($('<div>',{
            'class': whitePlayer.chipColor
        }));
        gameArr[parseFloat(coordinates.row)][parseFloat(coordinates.col)]=1;
        player-=1;
        whitePlayer.chipStack-=1;
        console.log(whitePlayer.chipStack)
    }

    turnoffValidPlacementHint();
    return coordinates;

}


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
    validPlacement(possiblePlacementArr);
}

function chipCounter(arr){ //this'll after flip function
    var counterObj = {
        blackCount:0,
        whiteCount:0
    };
    for(i=0;i<arr.length;i++){
        for(p=0;p<arr[i].length;p++){
            if(arr[i][p]===0){
                counterObj.blackCount+=1;
            }else if(arr[i][p]===1){
                counterObj.whiteCount+=1
            }
        }
    }
    return counterObj;
}

function winCheck(){
    var currentCounter = chipCounter(gameArr); //returns an object with whiteCount and blackCount
    if(blackPlayerStack===0 && whitePlayerStack===0 || !blackPlayer.validTurn && !whitePlayer.validTurn){
        if(currentCounter.blackCount>currentCounter.whiteCount){
            console.log('black wins')
        }else{
            console.log('white wins')
        }
    }
}
function turnoffValidPlacementHint(){
    $('.cell').each(function(){
        $(this).removeClass('valid')
    })
}
function validPlacement(arr){ //gets array from possible placement function containing coordinates that that'll added a class of valid;
    for(i=0;i<arr.length;i++){
        var row=arr[i][0];
        var col=arr[i][1];
        var rows = $('.row');
        $(rows[row]).find("[col="+col+"]").addClass("valid");
    }
}
console.log(findPossiblePlacements());
