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