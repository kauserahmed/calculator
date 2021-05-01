const calculator_interface = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputNumber(digit) {
  const { displayValue, waitingForSecondOperand } = calculator_interface;

  if (waitingForSecondOperand === true) {
    calculator_interface.displayValue = digit;
    calculator_interface.waitingForSecondOperand = false;
  } else {
    calculator_interface.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
}

function operatorSign(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator_interface;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator_interface.waitingForSecondOperand) {
    calculator_interface.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator_interface.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = calculate(currentValue, inputValue, operator);

    calculator_interface.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator_interface.firstOperand = result;
  }

  calculator_interface.waitingForSecondOperand = true;
  calculator_interface.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function inputDecimal(dot) {
  if (calculator_interface.waitingForSecondOperand === true) {
    calculator_interface.displayValue = '0.';
    calculator_interface.waitingForSecondOperand = false;
    return;
  }

  if (!calculator_interface.displayValue.includes(dot)) {
    calculator_interface.displayValue += dot;
  }
}

function resetcalculator_interface() {
  calculator_interface.displayValue = '0';
  calculator_interface.firstOperand = null;
  calculator_interface.waitingForSecondOperand = false;
  calculator_interface.operator = null;
}

function newDisplay() {
  const display = document.querySelector('.input_output_display');
  display.value = calculator_interface.displayValue;
}

newDisplay();

const keys = document.querySelector('.number_keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      operatorSign(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'removes_all':
      resetcalculator_interface();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputNumber(value);
      }
  }

  newDisplay();
});