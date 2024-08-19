document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector(".display");
    display.textContent = "0";
    const buttons = document.querySelectorAll("button");
    let operation = "";
    let periodUsed = false;
    let currentNum = 0;
    let total = 0;
    let pendingOperation = false;

    console.log(buttons);

    buttons.forEach(button => { 
        console.log(`Attaching event listener to button: ${button.textContent}`);
        button.addEventListener("click", () => {
            const input = button.textContent;
            console.log(`Input ${input} was pressed`);
            
            if (Number.isInteger(Number.parseInt(input)) || (input === "." && !periodUsed)) {
                if (input === "." && display.textContent === "0") {
                    display.textContent = display.textContent.concat(input);
                    periodUsed = true;
                    return;
                }

                if (display.textContent === "0" || pendingOperation) { 
                    display.textContent = input;
                    pendingOperation = false;
                } else {
                    display.textContent = display.textContent.concat(input);
                }

                console.log(`Display updated to: ${display.textContent}`);
                return;
            }

            if (input === ".") return;
            
            if (input === "CLEAR") {
                display.textContent = "0";
                periodUsed = false;
                currentNum = 0;
                total = 0;
                operation = "";
                pendingOperation = false;
                console.log("Display cleared")
                return;
            }

            if (input !== "=") {
                currentNum = parseFloat(display.textContent);
                console.log(`Operation set to: ${operation}`);

                if (total === 0) {
                    total = currentNum;
                } else if (operation !== "") {
                    total = operate(operation, total, currentNum);
                    display.textContent = total;
                }
                
                operation = input;
                pendingOperation = true;
                periodUsed = false;
            } else {
                if (!operation) return;
                currentNum = parseFloat(display.textContent);
                total = operate(operation, total, currentNum);
                display.textContent = total;
                operation = "";
            }
        })
    });
})

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "ERROR";
    }
    return num1 / num2;
}

// console.log(add(1, 2));
// console.log(subtract(1, 2));
// console.log(multiply(1, 2));
// console.log(divide(1, 2));