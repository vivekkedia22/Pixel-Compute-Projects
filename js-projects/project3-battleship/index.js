const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset-btn");
const gameResult = document.getElementById("game-result");
const grid = document.getElementById("grid");
let noOfShipsPut = 0;
let noOfWaterPut = 0;

let noOfShipsSelected = 0;
let noOfMoves = 8;
const shipImgUrl =
  "https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png";
const waterUrl =
  "https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp";

const createImageElement = () => {
  const img = document.createElement("img");
  const randomGuess = Math.floor(Math.random() * 2);
  console.log("this is the random guess", randomGuess);
  console.log("this is the noOfShipsPut", noOfShipsPut);
  console.log("this is the waterput", noOfWaterPut);
  if (randomGuess == 0 && noOfShipsPut < 5) {
    img.setAttribute("src", shipImgUrl);
    img.setAttribute("alt", "ship");
    img.dataset.type = "ship";
    noOfShipsPut++;
  } else if (noOfWaterPut < 11) {
    img.setAttribute("src", waterUrl);
    img.setAttribute("alt", "water");
    img.dataset.type = "water";
    noOfWaterPut++;
  } else if (noOfShipsPut < 5) {
    img.setAttribute("src", shipImgUrl);
    img.setAttribute("alt", "ship");
    img.dataset.type = "ship";
    noOfShipsPut++;
  }
  img.style.cssText = "height:100%;width:100%";
  img.style.opacity = 0;
  return img;
};

const addEvent = () => {
  grid.onclick = (event) => {
    const cell = event.target.parentElement;
    if (Number(cell.dataset.isClicked)) {
      console.log("Already Clicked");
      return;
    }
    cell.dataset.isClicked = 1;
    const img = cell.firstChild;
    img.style.opacity = 100;
    if (img.dataset.type == "ship") {
      noOfShipsSelected++;
    }
    noOfMoves--;
    console.log("noOfMoves", noOfMoves);
    console.log("noOfSHips", noOfShipsPut);

    if (noOfMoves === 0 || noOfShipsSelected === 5) {
      dialog.showModal();
      dialog.classList.remove("hidden");
      dialog.classList.add("absolute");
      gameResult.innerText =
        noOfShipsSelected === 5 ? "You Won!!!🥇" : "You Lost!!!😞";
    }
  };
};

const dialog = document.querySelector("dialog");

const putImages = () => {
  for (let cell of cells) {
    const img = createImageElement();
    cell.appendChild(img);
  }
};

const removeImages = () => {
  for (let cell of cells) {
    const img = cell.firstChild;
    cell.dataset.isClicked = 0;
    cell.removeChild(img);
  }
};

resetBtn.onclick = () => {
  resetGame();
};

const dialogBtn = document.querySelector("dialog button");
dialogBtn.onclick = () => {
  dialog.classList.remove("visible");
  dialog.classList.add("hidden");
  dialog.close();
  resetGame();
};
const resetGame = () => {
  noOfShipsPut = 0;
  noOfWaterPut = 0;
  noOfMoves = 8;
  noOfShipsSelected = 0;

  removeImages();
  putImages();
};

putImages();

addEvent();
