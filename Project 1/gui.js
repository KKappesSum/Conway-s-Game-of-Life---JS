let life;
let boardSize = 50;
let isRunning = false;

function setup(){
    life = new Life(boardSize);
    // life = new Life(5);
}

function changeBoard(size){
    boardSize += size;
    if(boardSize < 10){
        boardSize = 10;
    }else if(boardSize > 1000){
        boardSize = 1000;
    }
    document.getElementById("boardSize").innerHTML = boardSize;
}

function input(loc){
    if(!isRunning){
        life.input(loc);
    }
}

function run(){
    isRunning = true;
    life.run();
}

function stop(){
    life.isDone = true;
}

function restart(){
    location.reload();
}