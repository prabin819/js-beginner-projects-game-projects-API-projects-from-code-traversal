const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const divideBtn = document.getElementById('divideBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const substractBtn = document.getElementById('substractBtn');
const addBtn = document.getElementById('addBtn');
const decimalBtn = document.getElementById('decimalBtn');
const equalBtn = document.getElementById('equalBtn');
const numberBtns = document.querySelectorAll('.number');

//initialize variables
let result = '';
let operation = '';
let previousOperand = 0;

//function to append number
const appendNumber = (number)=>{
    if(number === '.' && result.includes('.')){
        return;
    }
    result += number;
    updateDisplay();
}

//function to calculate result
const calculateResult = () =>{
    let evaluatedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            evaluatedResult = prev + current;
            break;
        case '-':
            evaluatedResult = prev - current;
            break;
        case '*':
            evaluatedResult = prev * current;
            break;
        case '/':
            evaluatedResult = prev / current;
            break;
    
        default:
            return;
    }

    result = evaluatedResult.toString();
    operation = '';
    previousOperand = '';
}

//function to update display
const updateDisplay = ()=>{
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`; 
    }else{
        resultElement.innerText = result;
    }
}

//add event listener to number buttons
numberBtns.forEach(button => {
    button.addEventListener('click',()=>{
        appendNumber(button.innerText);
    })
});


//function to select operator
const selectOpreator = (operatorValue)=>{
    if(result === '') return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }

    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

//function to clear display
const clearDisplay = ()=>{
    result ='';
    previousOperand = '';
    operation = '';
    updateDisplay();
}

//function to delete last character display
const deleteLastCharacter = ()=>{
    if(result ='') return;
    result = result.slice(0,-1);
    updateDisplay();
}

//add event listener to . button
decimalBtn.addEventListener('click',()=>{appendNumber('.')});
addBtn.addEventListener('click',()=>{selectOpreator('+')});
substractBtn.addEventListener('click',()=>{selectOpreator('-')});
multiplyBtn.addEventListener('click',()=>{selectOpreator('*')});
divideBtn.addEventListener('click',()=>{selectOpreator('/')});
equalBtn.addEventListener('click',()=>{
    if(result === '') return;
    calculateResult();
    updateDisplay();
});
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);