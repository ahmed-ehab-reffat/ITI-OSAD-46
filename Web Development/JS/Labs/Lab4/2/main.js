var screen = document.querySelector("#Answer");

let currentInput = "";
let currentOperator = "";
let previousInput = "";

function EnterNumber(num) {
  currentInput += num;
  screen.value += num;
}

function EnterOperator(operator) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    EnterEqual();
  }

  currentOperator = operator;
  previousInput = currentInput;
  currentInput = "";
  screen.value += operator;
}

function EnterEqual() {
  if (previousInput === "" || currentInput === "") return;
  let result;
  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);

  switch (currentOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Cannot divide by zero");
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  currentOperator = "";
  previousInput = "";
  screen.value = currentInput;
}

function EnterClear() {
  currentInput = "";
  previousInput = "";
  currentOperator = "";
  screen.value = "";
}
