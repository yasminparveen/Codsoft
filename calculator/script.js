let displayElement = document.getElementById('display');
let currentInput = '';
let operator = null;
let shouldResetScreen = false;

function clearDisplay() {
    currentInput = '';
    displayElement.textContent = '0';
}

function deleteDigit() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        displayElement.textContent = '0';
    } else {
        displayElement.textContent = currentInput;
    }
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (number === 0 && currentInput === '0') return;
    currentInput += number.toString();
    displayElement.textContent = currentInput;
}

function appendDot() {
    if (currentInput.includes('.')) return;
    currentInput += '.';
    displayElement.textContent = currentInput;
}

function appendOperator(op) {
    if (operator !== null) compute();
    operator = op;
    currentInput += ` ${operator} `;
    displayElement.textContent = currentInput;
}

function compute() {
    let [leftOperand, operator, rightOperand] = currentInput.split(' ');
    leftOperand = parseFloat(leftOperand);
    rightOperand = parseFloat(rightOperand);
    
    if (isNaN(leftOperand) || isNaN(rightOperand)) return;
    
    let result;
    switch (operator) {
        case '+':
            result = leftOperand + rightOperand;
            break;
        case '-':
            result = leftOperand - rightOperand;
            break;
        case '*':
            result = leftOperand * rightOperand;
            break;
        case '/':
            result = leftOperand / rightOperand;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    displayElement.textContent = currentInput;
    operator = null;
    shouldResetScreen = true;
}
