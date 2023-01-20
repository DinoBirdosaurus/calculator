let currentNum = ""
let inputNum = ""
let operator = ""

const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const equalsButton = document.querySelector('.equal');
const decimalButton = document.querySelector('.decimal');
const allclearButton = document.querySelector('.allclear');
const backspaceButton = document.querySelector('.clear');

// screens
const inputScreen = document.getElementById('inputScreen')
const currentScreen = document.getElementById('currentScreen')
const historyPanel = document.getElementById('historyPanel')

equalsButton.addEventListener("click", () => {
    if (currentNum != "" && inputNum != "") {
        calculate();
    }
});

numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    })
});

const handleNumber = (number) => {
    if (currentNum.length <= 11) {
        currentNum += number;
        currentScreen.textContent = currentNum;
    }
};

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    })
})

const handleOperator = (op) => {
    operator = op;
    inputNum = currentNum;
    inputScreen.textContent = inputNum + " " + operator;
    currentNum = "";
    currentScreen.textContent = "";
}

const calculate = () => {
    inputNum = Number(inputNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        inputNum += currentNum;
    } else if (operator === "-") {
        inputNum -= currentNum;
    } else if (operator === "*") {
        inputNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            inputNum = "Error ÷ 0";
            displayResult();
            return;
        }
    }
};

const displayResult = () => {
    inputScreen.textContent = "";
    operator = "";
    if (inputNum.length <= 11) {
        currentScreen.textContent = inputNum;
    } else {
        currentScreen.textContent = inputNum.slice(0, 11) + "...";
    }
};

const add = (x, y) => {
    return x + y;
};
  
const subtract = (x, y) => {
    return x - y;
};

const multiply = (x, y) => {
    return x * y;
}

const divide = (x, y) => {
    return x / y;
};


const operate = (operator, x, y) => {
    x = Number(x)
    y = Number(y)
    switch (operator) {
        case '+':
            return add(x, y)
        case '-':
            return subtract(x, y) 
        case 'x':
            return multiply(x, y) 
        case '÷':
            if (b === 0) return null
            else return divide(x ,y)
        default:
            return null
    }
  };