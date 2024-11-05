function GameBoard(){
    const rows = 3;
    const columns = 3;
    
}

function GameCell(position){
    const cellPosition = position;
    let cellMarker = 0;

    const setCellMarker = (playerMarker) => {
        cellMarker = playerMarker;
    }
}

function createPlayer(name, marker){
    // Properties;
    const playerName = name;
    const playerMarker = marker;
    let score = 0;

    // Getter;
    const getName = () => name;
    const getMarker = () => marker;
    const getScore = () => score;

    // Add score to player when they win;
    const addScore = (points) => score++;

    // Player will make a move;
    const makeMove = () => {};
        
    return {
        getName, 
        getMarker, 
        makeMove,
        getScore,
        addScore
    };                     
}

function Game(){

}