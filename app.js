// 
class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay, historyPanel) {
        this.previousOperandDisplay = previousOperandDisplay;
        this.currentOperandDisplay = currentOperandDisplay;
        this.historyPanel = historyPanel;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // a check to disable multiple decimals
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '')  // a check to prevent numbers from clearing
            return;
        if (this.currentOperand !== '') { // a check that allows numbers to auto-compute after a new operand is clicked after a (num + operator + num) 
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand // moves operand to smaller screen
        this.currentOperand = ''                 // and then clears bigger screen
    }

    compute() { // basic compute function
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break
            case '-':
                computation = previous - current;
                break
            case '*':
                computation = previous * current;
                break
            case '÷':
                computation = previous / current;
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandDisplay.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandDisplay.innerText =
            `${this.previousOperand} ${this.operation}` 
        }
    }
}

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

const equalsButton = document.querySelector('#equals');
const allclearButton = document.querySelector('.allclear');
const backspaceButton = document.querySelector('.clear');


// where we will display numbers and operand on screens
const previousOperandDisplay = document.querySelector('[data-previous-operand]');
const currentOperandDisplay = document.querySelector('[data-current-operand]');
const historyPanel = document.getElementById('historyPanel');

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
    calculator.compute();
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