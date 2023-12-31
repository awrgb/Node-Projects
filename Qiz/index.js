#!/usr/bin/env node
import inquirer from 'inquirer';
class Quiz {
    questions = [];
    score = 0;
    constructor() {
        this.initializeQuestions();
    }
    initializeQuestions() {
        this.questions.push({
            text: 'What does "TS" stand for?',
            choices: ['TypeScript', 'TypeStyle', 'TypeScripting', 'TypicalScript'],
            correctAnswer: 'TypeScript',
        });
        this.questions.push({
            text: 'Which keyword is used to declare variables in JavaScript?',
            choices: ['var', 'let', 'const', 'varlet'],
            correctAnswer: 'let',
        });
        this.questions.push({
            text: 'Is Typescript Improved Developer Experiece?',
            choices: ['No', 'Yes',],
            correctAnswer: 'Yes',
        });
        this.questions.push({
            text: 'What Languages in Computer Typescript is Used?',
            choices: ['React', 'Next.js', 'Html', 'Css'],
            correctAnswer: 'React',
        });
        this.questions.push({
            text: 'Is typescript is stactic Typely?',
            choices: ['Yes', 'No'],
            correctAnswer: 'Yes',
        });
        // Add more questions as needed
    }
    async askQuestion(question) {
        const userAnswer = await inquirer.prompt({
            type: 'list',
            name: 'answer',
            message: question.text,
            choices: question.choices,
        });
        return userAnswer.answer === question.correctAnswer;
    }
    async runQuiz() {
        for (const question of this.questions) {
            const isCorrect = await this.askQuestion(question);
            if (isCorrect) {
                console.log('Correct!\n');
                this.score++;
            }
            else {
                console.log(`Incorrect! The correct answer is: ${question.correctAnswer}\n`);
            }
        }
        console.log(`Quiz completed. Your score: ${this.score}/${this.questions.length}`);
    }
    async startQuiz() {
        console.log('Welcome to the TypeScript and JavaScript Quiz!\n');
        await this.runQuiz();
    }
}
// Instantiate and start the quiz
const quiz = new Quiz();
quiz.startQuiz();
