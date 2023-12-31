#!/usr/bin/env node

import inquirer from 'inquirer';

// Currency rates (as of a specific date)
const exchangeRates: { [key: string]: number } = {
    PKR: 1,
    USD: 0.0036,    // US Dollar
    EUR: 0.0033, // Euro
    GBP: 0.0028, // British Pound
    JPY: 0.51,  // Japanese Yen
};

// Function to convert currency
function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        throw new Error('Invalid currency code');
    }

    // Conversion formula: amount * (exchange rate fromCurrency to USD / exchange rate toCurrency to USD)
    const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    return parseFloat(convertedAmount.toFixed(2)); // Limiting the result to two decimal places
}

// Function to get user input using inquirer with choices
async function getUserInput(): Promise<{ amount: number, fromCurrency: string, toCurrency: string }> {
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount of money:',
        },
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the currency you have:',
            choices: Object.keys(exchangeRates),
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Select the currency you want to convert to:',
            choices: Object.keys(exchangeRates),
        },
    ]);

    return {
        amount: answers.amount,
        fromCurrency: answers.fromCurrency.toUpperCase(),
        toCurrency: answers.toCurrency.toUpperCase(),
    };
}

// Main function
async function main() {
    try {
        const { amount, fromCurrency, toCurrency } = await getUserInput();
        const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);

        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`);
    } catch (error) {
        console.error(error.message);
    }
}

// Run the program
main();
