function GameBoard(){
    // Attributes
    const rows = 3;
    const columns = 3;
    const board = [];
    let idCounter = 0;
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell(i, j, idCounter++));
        }
      }

    // Function to reset the board array;
    const clearBoard = () => {
        board.splice(0, arr.length);
        idCounter = 0;
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
              board[i].push(Cell(i, j));
            }
          }
    };

    // Function to return the board array
    const getBoard = () => board;

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
        clearBoard
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

function GameController(){
    // Properties
    const board = GameBoard();
    const playerOne =  Player("George", 1);
    const playerTwo =  Player("Lucy", 2);
    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`It's now ${activePlayer}'s turn.`);
    };

    const playRound = (cellId) => {
        console.log(
            `${activePlayer} chose ${cellId}...`
          );
        board.setCellMarker(cellId, activePlayer.getMarker());
        switchPlayerTurn();
        printNewRound();
    };

    return {
        getActivePlayer,
        playRound,
    };
}

