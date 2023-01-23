
class Calculator { // class to make everything look neat and organized
    constructor(previousOperandDisplay, currentOperandDisplay, historyPanel) {
        this.previousOperandDisplay = previousOperandDisplay;
        this.currentOperandDisplay = currentOperandDisplay;
        this.historyPanel = historyPanel;
        this.clear();
    };

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    };

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // a check to disable multiple decimals
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperation(operation) {
        if (this.currentOperand === '')  // a check to prevent numbers from clearing
            return;
        if (this.currentOperand !== '') { // a check that allows numbers to auto-operate after a new operand is clicked after a (num + operator + num) 
            this.operate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand // moves operand to smaller screen
        this.currentOperand = ''                 // and then clears bigger screen
    };

    operate() { // basic operate function
        let computation;
        const x = parseFloat(this.previousOperand)
        const y = parseFloat(this.currentOperand)
        if (isNaN(x) || isNaN(y)) return
        switch (this.operation) {
            case '+':
                computation = x + y;
                break
            case '-':
                computation = x - y;
                break
            case 'x':
                computation = x * y;
                break
            case '÷':
            
            if (y === 0) {
                alert ("Error: Division by 0")
                calculator.clear()
                return
            }
                computation = x / y;
                
                break
            default:
                return
        }
        
        this.currentOperand = Math.round(computation * 1000)/1000;
        this.operation = undefined;
        this.previousOperand = '';
    };

    betterNumDisplay(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { // allows big integers to format with commas
                maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    };
    updateDisplay() {
        this.currentOperandDisplay.innerText = 
            this.betterNumDisplay(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandDisplay.innerText =
            `${this.betterNumDisplay(this.previousOperand)} ${this.operation}` 
        } else {previousOperandDisplay.innerText = ''}
    }
    updateHistory() {

    }
};

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

const equalsButton = document.querySelector('#equals');
const allclearButton = document.querySelector('.allclear');
const backspaceButton = document.querySelector('.clear');


// where we will display numbers and operand on screens
const previousOperandDisplay = document.querySelector('[data-previous-operand]');
const currentOperandDisplay = document.querySelector('[data-current-operand]');
const historyPanel = document.getElementById('historyPanel');

window.addEventListener('keydown', keyboardInput)
equalsButton.addEventListener('click', keyboardInput)
allclearButton.addEventListener('click', keyboardInput)
backspaceButton.addEventListener('click', keyboardInput)

// sets number buttons up for calculation
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText) // calls function appendNumber
        calculator.updateDisplay() // calls function updateDisplay
    })
});
// sets operators up for calculation
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText) // calls function chooseOperation
        calculator.updateDisplay()
    })
});

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay) 

equalsButton.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay();
});

allclearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

backspaceButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    }
    if (e.key === '.') {
        calculator.appendNumber(e.key.innerText)
        calculator.updateDisplay()
    }
    if (e.key === '=' || e.key === 'Enter' || e.key === ' ') {
        calculator.operate()
    }
    if (e.key === 'Backspace') {
        calculator.delete()
        calculator.updateDisplay()
    }
    if (e.key === 'Escape') {
        calculator.clear()
        calculator.updateDisplay()
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      calculator.chooseOperation(e.key.innerText)
      calculator.updateDisplay()
    }
  }