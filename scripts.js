function GameBoard(){
    // Attributes
    const rows = 3;
    const columns = 3;
    const board = [];
    let idCounter = 1;
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell(i, j, idCounter++));
        }
      }

    // Function to reset the board array;
    const clearBoard = () => {
        board.splice(0, rows);

        console.log(board.length)
        idCounter = 1;
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
              board[i].push(Cell(i, j, idCounter++));
            }
          }
    };

    // Function to return the board array
    const getBoard = () => board;

    const isBoardFull = () => {
        // Check if the board is full
        for (let row of board) {
            for (let cell of row) {
                if (cell.getCellMarker() === 0) { // Assuming 0 represents an empty cell
                    return false; // Found an empty cell, the board isn't full
                }
            }
        }
        return true; // No empty cells found, the board is full
    };

    // Function to find the corresponding cell
    const findCell = (id) => {
        for (const row of board) {
            const cell = row.find((cell) => {
                return cell.getCellId() === id;
            });
            
            // If we find the cell, check if it’s unoccupied
            if (cell) {
                // Check if the cell marker is 0 (unoccupied)
                if (cell.getCellMarker() === 0) {
                    return cell; // Return the unoccupied cell
                } else {
                    return null; // The cell is occupied
                }
            }
        }
        return null; // Return null if no cell with the given position is found
    };

    // Mark the cell, if it is already occupied, then return null
    const markCell = (cellId, marker) => {
        // Find the cell
        const cell = findCell(cellId);
        
        if (cell === null){
            return null;
        }

       // Set the cell to the player's marker
        cell.setCellMarker(marker);
    };

    // Function to print the gameboard
    const printBoard = () => {
        const updatedBoard = board.map((row) => {
            return row.map((cell) => cell.getCellMarker());
        });
    
        console.log(updatedBoard);
    };

    return {
        getBoard,
        markCell,
        printBoard,
        clearBoard,
        isBoardFull
    }
}

function Cell(row, column, id){
    // Properties
    let cellMarker = 0;
    const cellId = id;
    const position = {row, column};

    const setCellMarker = (marker) => cellMarker = marker;

    const getCellMarker = () => cellMarker;

    const getCellId = () => cellId;

    const getPosition = () => position;

    return{
        getPosition,
        getCellId,
        getCellMarker,
        setCellMarker
    };
}

function Player(name, marker){
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
        
    return {
        getName, 
        getMarker, 
        getScore,
        addScore
    };                     
}

function Game(player1Name, player2Name){
    // Properties
    const board = GameBoard();
    const playerOne =  Player(player1Name, 1);
    const playerTwo =  Player(player2Name, 2);
    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
    };

    // Game logic
    const checkResult = () => {
        const gameBoard = board.getBoard(); 
        const size = gameBoard.length;
    
        // Check for horizontal wins
        for (let row = 0; row < size; row++) {
            const firstCellMarker = gameBoard[row][0].getCellMarker();
            if (firstCellMarker !== 0 && gameBoard[row].every(cell => cell.getCellMarker() === firstCellMarker)) {
                return true; 
            }
        }
    
        // Check for vertical wins
        for (let col = 0; col < size; col++) {
            const firstCellMarker = gameBoard[0][col].getCellMarker();
            if (firstCellMarker !== 0 && gameBoard.every(row => row[col].getCellMarker() === firstCellMarker)) {
                return true;
            }
        }
    
        // Check for diagonal wins (top-left to bottom-right)
        const firstDiagonalMarker = gameBoard[0][0].getCellMarker();
        if (firstDiagonalMarker !== 0 && gameBoard.every((row, index) => row[index].getCellMarker() === firstDiagonalMarker)) {
            return true; 
        }

        // Check for diagonal wins (top-right to bottom-left)
        const secondDiagonalMarker = gameBoard[0][size - 1].getCellMarker();
        if (secondDiagonalMarker !== 0 && gameBoard.every((row, index) => row[size - 1 - index].getCellMarker() === secondDiagonalMarker)) {
            return true; 
        }
        
        // Return full if board is full
        if (board.isBoardFull()) {
            return "full";
        } 

        // Return false if there is no winner yet
        return false;
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`It's now ${activePlayer.getName()}'s turn.`);
    };

    const playRound = (cellId) => {
        console.log( `${activePlayer.getName()} chose cell ${cellId}...` );

        // Error checking
        const markedCell = board.markCell(cellId, activePlayer.getMarker())
        if( markedCell === null) {
            console.log( `Cell ${cellId} doesn't exist / already occupied!` );
            return;
        }

        // Check results
        const result = checkResult();
        if (result) {
            console.log(`Winner is ${activePlayer.getName()}!`);
            board.clearBoard();
            return;

        } else if (result === "full"){
            console.log(`Board is Full! Tie!`);
            board.clearBoard();
            return;
        }
        
        switchPlayerTurn();
        printNewRound();
    };

    return {
        getActivePlayer,
        playRound,
    };
}

const DisplayController = (function (){

})();

const game = GameController();