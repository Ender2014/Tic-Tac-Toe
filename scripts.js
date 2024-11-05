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
        let lol = 0;
        // Check if the board is full
        for (let row of board) {
            for (let cell of row) {
                if (cell.getCellMarker() === 0) { 
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
    const playerOne =  Player(player1Name, "X");
    const playerTwo =  Player(player2Name, "O");
    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
    };

    // Game logic
    const checkResult = () => {
        const gameBoard = board.getBoard(); 
        const size = gameBoard.length;
       
        // Return full if board is full
        if (board.isBoardFull()) {
            return "full";
        } 

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
            return "error";
        }

        // Check results
        const result = checkResult();
        console.log(result)
        if (result === "full"){
            console.log(`Board is Full! Tie!`);
            board.clearBoard();
            return "full"

        } else if (result) {
            console.log(`Winner is ${activePlayer.getName()}!`);
            activePlayer.addScore(1);
            board.clearBoard();
            return "won";
        } 
        
        switchPlayerTurn();
        printNewRound();
    };

    return {
        getActivePlayer,
        playRound,
    };
}

// Display Controller
(function() {
    const names = ["PLAYER 1", "PLAYER 2"];
    const game = Game(names[0], names[1]);
    const domBoard = document.querySelector(".game-board");
    const domCells = document.querySelectorAll(".cell");
    const domPlayer1Name = document.querySelector(".player1").children[0];
    const domPlayer1Score = document.querySelector(".player1").children[1];
    const domPlayer2Name = document.querySelector(".player2").children[0];
    const domPlayer2Score = document.querySelector(".player2").children[1];
    const domTieScore = document.querySelector(".tie").children[1];
    
    let gameOver = false; // Flag to check if the game is over

    domPlayer1Name.textContent = names[0];
    domPlayer2Name.textContent = names[1];

    domCells.forEach((cell, index) => {
        const p = cell.children[0];

        cell.addEventListener("click", () => {
            if (gameOver) {
                // Reset the game if already over
                resetGame();
                return;
            }

            const activePlayer = game.getActivePlayer();
            const result = game.playRound(index + 1);

            if (result !== "error") {
                p.textContent = activePlayer.getMarker();
            }

            if (result === "full" || result === "won") {
                gameOver = true; // Set game over flag
                if (result === "full") {
                    domTieScore.textContent = parseInt(domTieScore.textContent) + 1; // Increment tie score
                } else if (result === "won") {
                    if (activePlayer.getName() === names[0]) {
                        domPlayer1Score.textContent = activePlayer.getScore();
                    } else if (activePlayer.getName() === names[1]) {
                        domPlayer2Score.textContent = activePlayer.getScore();
                    }
                } 
            }
        });
    });

    function resetGame() {
        // Clear the board and reset game state
        domCells.forEach(cell => {
            const p = cell.children[0];
            p.textContent = ""; 
        });
        gameOver = false; 
    }
})();