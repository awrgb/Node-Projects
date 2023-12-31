#!/usr/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 4000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('Lets start Calculator');
    await sleep();
    rainbowTitle.stop();
    console.log(` _____________________
|  _________________  |
| | JO           0. | |
| |_________________| |
|  ___ ___ ___   ___  |
| | 7 | 8 | 9 | | + | |
| |___|___|___| |___| |
| | 4 | 5 | 6 | | - | |
| |___|___|___| |___| |
| | 1 | 2 | 3 | | x | |
| |___|___|___| |___| |
| | . | 0 | = | | / | |
| |___|___|___| |___| |
|_____________________|`);
}
welcome();
async function runCalculator() {
    const userInput = await inquirer.prompt([
        {
            type: 'number',
            name: 'num1',
            message: 'Enter the first number:',
        },
        {
            type: 'list',
            name: 'operation',
            message: 'Select operation:',
            choices: ['add', 'subtract', 'multiply', 'divide'],
        },
        {
            type: 'number',
            name: 'num2',
            message: 'Enter the second number:',
        },
    ]);
    const { num1, operation, num2 } = userInput;
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                console.log('Error: Cannot divide by zero');
                return;
            }
            result = num1 / num2;
            break;
        default:
            console.log('Invalid operation');
            return;
    }
    console.log(`Result of ${num1} ${operation} ${num2}: ${result}`);
}
runCalculator();
