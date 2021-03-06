const readline = require('readline-sync');

function getNumberWithPrompt(promptMessage, errorMessage) {
    if (errorMessage == undefined) {
        errorMessage = "Invalid entry: ";
    }
    console.log(promptMessage);
    numberString = readline.prompt();
    number = +numberString;
    while (numberString == "" || isNaN(number)) {
        console.log(errorMessage + ": " + promptMessage);
        numberString = readline.prompt();
        number = +numberString;
    }
    return number;
}

function getOperatorWithPrompt(promptMessage, errorMessage) {
    if (errorMessage == undefined) {
        errorMessage = "Invalid entry: ";
    }
    console.log(promptMessage);
    operator = readline.prompt();
    while (!isValidOperator(operator)) {
        console.log(errorMessage + ": " + promptMessage);
        operator = readline.prompt();
    }
    return operator;
}

function doOperation(operator, firstOperand, secondOperand) {
    switch (operator) {
        case "+":
            firstOperand = firstOperand + secondOperand;
            break;
        case "*":
            firstOperand = firstOperand * secondOperand;
            break;
        case "-":
            firstOperand = firstOperand - secondOperand;
            break;
        case "/":
            firstOperand = firstOperand / secondOperand;
            break;
        default:
            firstOperand = "Not a valid operator";
            break;

    }
    return firstOperand;
}

function repeatOperation(operator, numbers) {
    "use strict";
    if (numbers.length < 2) {
        throw "repeat_operation must receive an array with the length >= 2";
    }
    let answer = numbers[0];
    let i = 0;
    while (++i < numbers.length) {
        answer = doOperation(operator, answer, numbers[i]);
    }
    return answer;
}

function isValidOperator(operator) {
    if (operator !== "+" && operator !== "*" && operator !== "-" && operator !== "/") {
        return false;
    }
    return true;
}

function getNumbersWithPrompt(numbersLength) {
    "use strict";
    let i = -1;
    let numbers = [];
    while (++i < numbersLength) {
        const number = getNumberWithPrompt("Enter number " + (i + 1),
            "Enter a valid number: ");
        numbers[i] = number;
    }
    return numbers;
}

function getNumbersLength(operatorPrompt) {
    "use strict";
    let numbersLength = getNumberWithPrompt("Enter how many numbers do you want to " +
        operatorPrompt + "?", "Enter a number: ");
    while (numbersLength < 2) {
        console.log("You must enter at least 2");
        numbersLength = getNumberWithPrompt("Enter how many numbers do you want to "
            + operatorPrompt + "?", "Enter a number: ");
    }

    return numbersLength;
}

(function() {
    "use strict";
    console.log("Welcome to the calculator:\n===============")
    while (true) {
        operator = getOperatorWithPrompt("Enter operator: ", "Enter a valid operator (+, *, -, /)");

        let numbersLength = getNumbersLength(operator);

        let numbersArray = getNumbersWithPrompt(numbersLength);

        let answer = repeatOperation(operator, numbersArray);

        console.log("The answer is: " + answer);
    }
})();
