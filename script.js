const boradSize = 3;
let currentPlayer = "X";
let moves = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < boradSize; i++) {
    for (let j = 0; j < boradSize; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-index", i * boradSize + j);
      cell.addEventListener("click", makeMove);
      board.appendChild(cell)
    }
  }
}

function makeMove(event) {
  const index = event.target.getAttribute("data-index");
  if(moves[index] === ""){
    moves[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    if(checkWin(currentPlayer)) {
      showModal(`${currentPlayer} wins!`);
      resetBoard()

    }else if(moves.every(move => move !== "")){
      showModal("It's a tie");
      resetBoard()
    }else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin(player){
  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  return winningCombinations.some((combination)=> {
    return (
      moves[combination[0]] === player &&
      moves[combination[1]] === player &&
      moves[combination[2]] === player 
  );
  });
}

function showModal(massage){
  const modal = document.getElementById("modal");
  const modalMassage = document.getElementById("modal-message");

  modalMassage.innerHTML = massage;
  modal.style.display = "block";

  modal.addEventListener("click", ()=> {
    modal.style.display = "none";
  })
}

function resetBoard(){
  currentPlayer = "X";
  moves = ["", "", "", "", "", "", "", "", "",];
  createBoard()
}
createBoard();