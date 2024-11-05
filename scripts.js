function GameBoard(){
    // Properties;
    const rows = 3;
    const columns = 3;
    const board = [];
    populateBoard();

    const populateBoard = () => {
        for (let i = 0; i < rows; i++){
            board[i] = i;
            for(let j = 0; j < columns; j++){
                board[i].push(Cell(i, j));  
            }
        }
    };

    const getBoard = () => board;

    const findCell = (row, column) => {
        for (const boardRow of board) {
            const cell = boardRow.find((cell) => {
                const cellPosition = cell.getPosition();
                return cellPosition.row === row && cellPosition.column === column;
            });
            if (cell) return cell; // Return as soon as we find the matching cell
        }
        return null; // Return null if no cell is found
    };

    const markCell = (row, column, player) => {
        // find the cell
        const cell = findCell(row, column);
        
     
        
        cell.setCellMarker(player);
    };

    const printBoard = () => {
        const updatedBoard = board.map((row) => {
            row.map((cell) => {
                cell.getCellMarker();
            });
        });

        console.log(updatedBoard);
    };

    const clearBoard = () => {
        board.splice(0, arr.length);
        populateBoard();
    };

    return {
        getBoard,
        markCell,
        printBoard,
        clearBoard
    }
}

function Cell(row, column){
    let cellMarker = 0;
    const position = {row, column};

    const setCellMarker = (player) => {
        cellMarker = player.getMarker();
    }

    const getPosition = () => position;

    const getCellMarker = () => cellMarker;

    return{
        getPosition,
        getCellMarker,
        setCellMarker
    };
}

function createPlayer(name, marker){
    // Properties;
    const playerName = name;
    const playerMarker = marker;
    let score = 0;

    // Getter;
    const getName = () => playerName;
    const getMarker = () => playerMarker;
    const getScore = () => score;

    // Add score to player when they win;
    const addScore = (points) => score += points;

    // Player will make a move;
    const makeMove = () => {

    };
        
    return {
        getName, 
        getMarker, 
        makeMove,
        getScore,
        addScore
    };                     
}

function GameController(){

}

