$(document).ready(initiateOthello);

function initiateOthello(){
    $('.cell').on('click',chipPlacement)
}

var player=0;
var blackPlayerStack=32;
var whitePlayerStack=32;
var blackPlayer = new Player('black');
var whitePlayer = new Player('white');
var gameArr = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, 1, null, null, null],
    [null, null, null, 0, 1, null, null, null],
    [null, null, null, 1, 0, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
];

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

    return coordinates;
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