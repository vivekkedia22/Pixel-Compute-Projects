const cells = document.getElementsByClassName("cell");
const container = document.querySelector(".game-container");
const gameMessage = document.querySelector(".game-message");
const resetBtn = document.getElementById("reset-btn");
let xPlayerTurn = false;
let values = new Array(new Array(3), new Array(3), new Array(3));
let noOfMoves = 9;
let isGameOver = false;
let result;

resetBtn.onclick = () => {
  resetGame();
};

container.onclick = (event) => {
  const cell = event.target;
  if (cell.classList[0] !== "cell" || isGameOver === true) {
    return;
  }
  if (Number(cell.dataset.isClicked)) {
    return;
  }
  cell.dataset.isClicked = 1;
  const num = cell.dataset.number;
  const i = Math.floor(num / 3);
  const j = num % 3;
  cell.innerText = xPlayerTurn ? "X" : "O";
  values[i][j] = xPlayerTurn ? "X" : "O";
  noOfMoves--;
  gameMessage.innerText = `${xPlayerTurn ? "O" : "X"} Player's Turn`;
  checkStatus(i, j);
  xPlayerTurn = !xPlayerTurn;
};

const checkStatus = (i, j) => {
  let hasWon = false;
  if (
    (i == 0 && j == 0) ||
    (i == 2 && j == 0) ||
    (i == 0 && j == 2) ||
    (i == 1 && j == 1) ||
    (i == 2 && j == 2)
  ) {
    if (
      values[0][0] &&
      values[0][0] === values[1][1] &&
      values[1][1] === values[2][2]
    ) {
      hasWon = true;
      result = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    } else if (
      values[0][2] &&
      values[2][0] === values[1][1] &&
      values[1][1] === values[0][2]
    ) {
      hasWon = true;
      result = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }
  }
  if (!hasWon) {
    hasWon = true;
    for (let k = 0; k <= 1; k++) {
      if (
        !values[i][k] ||
        !values[i][k + 1] ||
        values[i][k] !== values[i][k + 1]
      ) {
        hasWon = false;
        break;
      }
    }
    result = [
      [i, 0],
      [i, 1],
      [i, 2],
    ];
    if (!hasWon) {
      hasWon = true;
      for (let k = 0; k <= 1; k++) {
        if (
          !values[k][j] ||
          !values[k + 1][j] ||
          values[k][j] !== values[k + 1][j]
        ) {
          hasWon = false;
          break;
        }
      }
      result = [
        [0, j],
        [1, j],
        [2, j],
      ];
    }
  }
  if (hasWon) {
    isGameOver = true;
    console.log(`Yoohoo we won my ${xPlayerTurn ? "X" : "O"}!!`);
    gameMessage.innerText = `${xPlayerTurn ? "X" : "O"} Wins!!`;
    console.log("result::", result);
    for (let res of result) {
      let cellNo = res[0] * 3 + res[1];
      cells[cellNo].style.backgroundColor = "lightgreen";
    }
  } else if (noOfMoves === 0) {
    isGameOver = true;
    gameMessage.innerText = "DRAW!!";
    console.log("This is the draw");
  }
};
const resetGame = () => {
  values = [[], [], []];
  noOfMoves = 9;
  isGameOver = false;
  result = undefined;
  xPlayerTurn = false;
  for (let cell of cells) {
    cell.innerText = "";
    cell.style.backgroundColor = "white";
    cell.dataset.isClicked = 0;
    gameMessage.innerText = "O Player's Turn";
  }
};
