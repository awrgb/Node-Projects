#!/usr/bin/env node
import readlineSync from 'readline-sync';
class NumberGuessingGame {
    secretNumber;
    attempts;
    constructor() {
        this.secretNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
        this.attempts = 0;
    }
    startGame() {
        console.log('Welcome to the Number Guessing Game!');
        console.log('Try to guess the secret number between 1 and 100.');
        do {
            const userGuess = this.getUserGuess();
            this.attempts++;
            if (userGuess === this.secretNumber) {
                console.log(`Congratulations! You guessed the number in ${this.attempts} attempts.`);
                break;
            }
            else {
                this.displayHint(userGuess);
            }
        } while (true);
    }
    getUserGuess() {
        const userInput = readlineSync.questionInt('Enter your guess: ');
        if (userInput < 1 || userInput > 100) {
            console.log('Please enter a number between 1 and 100.');
            return this.getUserGuess();
        }
        return userInput;
    }
    displayHint(userGuess) {
        const hint = userGuess < this.secretNumber ? 'Too low!' : 'Too high!';
        console.log(hint);
    }
}
// Start the game
const game = new NumberGuessingGame();
game.startGame();
