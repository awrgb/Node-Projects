#!/usr/bin/env node
import inquirer from "inquirer";
// Function to count characters without whitespaces
function countCharactersWithoutWhitespace(text) {
    // Remove whitespaces and count characters
    const charactersWithoutWhitespace = text.replace(/\s/g, '');
    return charactersWithoutWhitespace.length;
}
// Function to count words without whitespaces
function countWordsWithoutWhitespace(text) {
    // Remove leading and trailing whitespaces, then split by whitespaces
    const wordsWithoutWhitespace = text.trim().split(/\s+/);
    return wordsWithoutWhitespace.length;
}
// Function to get user input using inquirer
async function getUserInput() {
    const answers = await inquirer.prompt([
        {
            type: 'editor',
            name: 'paragraph',
            message: 'Enter an English paragraph:',
        },
    ]);
    return answers.paragraph || '';
}
// Main function
async function main() {
    try {
        const paragraph = await getUserInput();
        const characterCount = countCharactersWithoutWhitespace(paragraph);
        const wordCount = countWordsWithoutWhitespace(paragraph);
        console.log(`Character count (excluding whitespaces): ${characterCount}`);
        console.log(`Word count (excluding whitespaces): ${wordCount}`);
    }
    catch (error) {
        console.error(error.message);
    }
}
// Run the program
main();
