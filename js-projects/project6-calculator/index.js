const inputNumbers = document.querySelector(".inputs-numbers");
const inputOperators = document.querySelector(".inputs-operators");
const display = document.querySelector(".display");
const equals = document.querySelector(".equals");

let value = 0;
let operator = undefined;
let number = 0;

inputNumbers.onclick = (event) => {
  let list = Array.from(event.target.classList);
  if (!list.includes("numbers") || list.includes("equals")) {
    return;
  }
  if (display.innerText !== "0") {
    display.innerText = display.innerText + event.target.innerText;
  } else {
    display.innerText = event.target.innerText;
  }
};

inputOperators.onclick = (event) => {
  let list = Array.from(event.target.classList);
  if (!list.includes("operators")) {
    return;
  }
  const newOperator = event.target.innerText;
  if (newOperator === "Del") {
    deleteNum();
    return;
  } else if (newOperator === "C") {
    location.reload();
    return;
  }
  let num = Number(display.innerText);
  if (!operator) {
    value = Number(display.innerText);
    operator = newOperator;
  } else {
    value = calculate(value, operator, num);
    operator = newOperator;
  }
  console.log(value);
  display.innerText = "0";
};

equals.onclick = (event) => {
  let num = Number(display.innerText);
  value = calculate(Number(value), operator, num);
  operator = undefined;
  display.innerText = value ?? num;
};

const calculate = (num1, operator, num2) => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "×":
      return num1 * num2;
    case "%":
      return num1 % num2;
    case "÷":
      return num1 / num2;
    case "Exp":
      return num1 ** num2;
    default:
      return;
  }
};

const deleteNum = () => {
  let str = display.innerText;
  display.innerText = str.substring(0, str.length - 1);
};
