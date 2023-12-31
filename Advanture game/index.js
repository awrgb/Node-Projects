#!/usr/bin/env node
import inquirer from 'inquirer';
class TextAdventureGame {
    scenes = {};
    currentScene = 'start';
    constructor() {
        this.initializeScenes();
    }
    initializeScenes() {
        this.scenes['start'] = {
            description: 'You find yourself in a dark room. There are two doors in front of you.',
            choices: [
                { text: 'Go through the left door', nextScene: 'leftRoom' },
                { text: 'Go through the right door', nextScene: 'rightRoom' },
            ],
        };
        this.scenes['leftRoom'] = {
            description: 'You enter a room filled with treasures. What do you want to do?',
            choices: [
                { text: 'Take the treasures and leave', nextScene: 'end' },
                { text: 'Leave the treasures and go back', nextScene: 'start' },
            ],
        };
        this.scenes['rightRoom'] = {
            description: 'You enter a room with a monster. What do you want to do?',
            choices: [
                { text: 'Fight the monster', nextScene: 'fightMonster' },
                { text: 'Run away', nextScene: 'start' },
            ],
        };
        this.scenes['fightMonster'] = {
            description: 'You decide to fight the monster. It was a tough battle, but you defeated the monster.',
            choices: [
                { text: 'Continue your journey', nextScene: 'end' },
            ],
        };
        this.scenes['end'] = {
            description: 'Congratulations! You have completed the adventure.',
            choices: [],
        };
    }
    async displayCurrentScene() {
        const currentScene = this.scenes[this.currentScene];
        console.log(currentScene.description);
        if (currentScene.choices.length > 0) {
            const userChoice = await inquirer.prompt({
                type: 'list',
                name: 'choice',
                message: 'What do you want to do?',
                choices: currentScene.choices.map((choice) => choice.text),
            });
            const chosenChoice = currentScene.choices.find((choice) => choice.text === userChoice.choice);
            if (chosenChoice) {
                this.currentScene = chosenChoice.nextScene;
                await this.displayCurrentScene();
            }
        }
        else {
            console.log('The end.');
            process.exit();
        }
    }
    async startGame() {
        console.log('Welcome to the Text Adventure Game!');
        await this.displayCurrentScene();
    }
}
// Instantiate and start the game
const game = new TextAdventureGame();
game.startGame();
