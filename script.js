const buttons = document.querySelector(".buttons");
const expressionElement = document.getElementById("expression");
const resultElement = document.getElementById("result");

let expression = "";
let justCalculated = false;

function updateDisplay(value) {
  expressionElement.textContent = expression;
  resultElement.textContent = value;
}

function calculateExpression() {
  if (!expression) {
    updateDisplay("0");
    return;
  }

  try {
    const calculatedValue = Function(`"use strict"; return (${expression})`)();

    if (!Number.isFinite(calculatedValue)) {
      updateDisplay("Error");
      return;
    }

    const formattedValue = Number.isInteger(calculatedValue)
      ? String(calculatedValue)
      : String(Number(calculatedValue.toFixed(6)));

    expressionElement.textContent = expression;
    resultElement.textContent = formattedValue;
    expression = formattedValue;
    justCalculated = true;
  } catch (error) {
    updateDisplay("Error");
  }
}

buttons.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const { value, action } = button.dataset;

  if (action === "clear") {
    expression = "";
    justCalculated = false;
    updateDisplay("0");
    return;
  }

  if (action === "calculate") {
    calculateExpression();
    return;
  }

  if (justCalculated) {
    expression = "";
    justCalculated = false;
  }

  expression += value;
  updateDisplay(resultElement.textContent === "Error" ? "0" : resultElement.textContent);
});

updateDisplay("0");
