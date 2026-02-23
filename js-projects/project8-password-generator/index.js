const isNumber = document.getElementById("num");
const isLetter = document.getElementById("letter");
const isMixed = document.getElementById("mixed");
const isPunctuation = document.getElementById("punc");
const length = document.getElementById("password-length");
const lengthLabel = document.getElementById("length-label");
const outputValue = document.getElementById("output-value");
const redAlert = document.getElementById("red-alert");
const greenAlert = document.getElementById("green-alert");
const cpyBtn = document.getElementById("cpy-btn");
const upperCase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const lowerCase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const punctuation = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "'",
  '"',
  ",",
  ".",
  "<",
  ">",
  "/",
  "?",
  "\\",
  "|",
  "`",
  "~",
];

length.oninput = (event) => {
  const value = event.target.value;
  lengthLabel.innerText = value;
  generatePassword();
};

const generatePassword = () => {
  if (
    !isNumber.checked &&
    !isLetter.checked &&
    !isMixed.checked &&
    !isPunctuation.checked
  ) {
    return;
  }
  let finalCharactersArray = [];
  if (isNumber.checked) {
    finalCharactersArray = [...finalCharactersArray, ...numbers];
  }
  if (isLetter.checked) {
    finalCharactersArray = [...finalCharactersArray, ...lowerCase];
  }
  if (isMixed.checked) {
    finalCharactersArray = [...finalCharactersArray, ...upperCase];
  }
  if (isPunctuation.checked) {
    finalCharactersArray = [...finalCharactersArray, ...punctuation];
  }
  let generatedPassword = "";
  Array.from({ length: length.value }).forEach(() => {
    const randomChar =
      finalCharactersArray[
        Math.floor(Math.random() * finalCharactersArray.length)
      ];
    generatedPassword += randomChar;
  });
  outputValue.setAttribute("value", generatedPassword);
};
cpyBtn.onclick = () => {
  copyPassword();
};
const copyPassword = () => {
  console.log(outputValue.value);
  if (!outputValue.value) {
    redAlert.style.display = "block";
    setTimeout(() => {
      redAlert.style.display = "none";
    }, 3000);
    return;
  }
  navigator.clipboard.writeText(outputValue.value).then((val) => {
    console.log(val);
    greenAlert.style.display = "block";
    setTimeout(() => {
      greenAlert.style.display = "none";
    }, 3000);
  });
};
