const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6] // Diagonals
];

// Handle cell click
function handleClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === "" && isGameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        if (isGameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Check for winner or draw
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusText.textContent = `Player ${gameBoard[a]} Wins! 🎉`;
            highlightWinningCells(pattern);
            isGameActive = false;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        isGameActive = false;
    }
}

// Highlight winning cells
function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add("winner");
    });
}

// Reset game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);