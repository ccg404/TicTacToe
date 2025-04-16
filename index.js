const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");


let currentPlayer = "X";
let gameOver = false;
let board = Array(9).fill(null);

const winPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // diagonal
  ];

function updatePlayerTurn() {
    statusText.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;
}

function checkWinner() {
  for (let pattern of winPatterns){
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every(cell => cell !== null) ? 'Tie' : null;
}

function handleClick(event) {
  const index = parseInt(event.target.id.split('-')[1]);
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner === "X" || winner === "O"){
    statusText.textContent = `Player ${winner === 'X' ? '1' : '2'} wins!`;
    gameOver = true;
    setTimeout(() => {
      alert(`Player ${winner === 'X' ? '1': '2'} wins!`) ;
    }, 100);
    return;
  } else if(winner === 'Tie'){
    gameOver = true;
    statusText.textContent = "It's a tie!";
    setTimeout(() => {
      alert("It's a tie!");
    }, 100);
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updatePlayerTurn();
}

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

updatePlayerTurn();


function resetGame() {
  board.fill(null);
  gameOver = false;
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
  });
  updatePlayerTurn();
}