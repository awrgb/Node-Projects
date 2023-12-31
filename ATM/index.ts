#!/usr/bin/env node
import  inquirer from 'inquirer';
/* The `ATM` class is a TypeScript class that represents an ATM machine. It has a private property
`users` which is a `Map` that stores user information such as their username, PIN, and balance. The
`ATM` class also has several methods that handle user registration, user authentication, and various
ATM transactions such as checking balance and withdrawing money. The `startATM` method is the entry
point of the ATM simulation and it prompts the user to register or login, and then presents a menu
of transaction options. */

class ATM {
    private readonly users: Map<string, { pin: string; balance: number }> = new Map();

    private async registerUser(): Promise<void> {
        const registrationQuestions = [
            {
                type: 'input',
                name: 'username',
                message: 'Choose a username:',
            },
            {
                type: 'password',
                name: 'pin',
                message: 'Create a PIN (4 digits):',
            },
        ];

        const registrationAnswers: any = await inquirer.prompt(registrationQuestions);


        const userId = registrationAnswers.username;
        const pin = registrationAnswers.pin;
        const balance = Math.floor(Math.random() * 5000) + 5000;

        this.users.set(userId, { pin, balance });

        console.log('Registration successful! You can now log in.');
    }

    private async authenticateUser(): Promise<string | undefined> {
        const loginQuestions = [
            {
                type: 'input',
                name: 'enteredUserId',
                message: 'Enter your user ID:',
            },
            {
                type: 'password',
                name: 'enteredPin',
                message: 'Enter your PIN:',
            },
        ];

        const loginAnswers: any = await inquirer.prompt(loginQuestions);


        const enteredUserId = loginAnswers.enteredUserId;
        const enteredPin = loginAnswers.enteredPin;

        const user = this.users.get(enteredUserId);

        if (user && user.pin === enteredPin) {
            console.log(`Login successful! Your balance is $${user.balance}`);
            return enteredUserId;
        } else {
            console.error('Invalid user ID or PIN. Please try again.');
            return undefined;
        }
    }

    async startATM(): Promise<void> {
        console.log("Welcome to the ATM!");

        const registrationPrompt = {
            type: 'confirm',
            name: 'register',
            message: 'Are you a new user? Do you want to register?',
        };

        const registrationAnswer = await inquirer.prompt(registrationPrompt);

        if (registrationAnswer.register) {
            await this.registerUser();
        }

        while (true) {
            const userId = await this.authenticateUser();

            if (userId) {
                const transactionTypeQuestion = {
                    type: 'list',
                    name: 'transactionType',
                    message: 'Choose a transaction type:',
                    choices: ['Check Balance', 'Withdraw Money', 'Exit'],
                };

                const transactionTypeAnswer = await inquirer.prompt(transactionTypeQuestion);

                switch (transactionTypeAnswer.transactionType) {
                    case 'Check Balance':
                        this.displayBalance(userId);
                        break;
                    case 'Withdraw Money':
                        await this.withdrawMoney(userId);
                        break;
                    case 'Exit':
                        console.log('Thank you for using the ATM. Goodbye!');
                        return;
                    default:
                        console.error('Invalid transaction type.');
                }
            }
        }
    }

    private displayBalance(userId: string): void {
        const user = this.users.get(userId);
        console.log(`Your current balance is $${user?.balance}`);
    }

    private async withdrawMoney(userId: string): Promise<void> {
        const withdrawalAmount = await inquirer.prompt({
            type: 'input',
            name: 'withdrawalAmount',
            message: 'Enter the amount to withdraw:',
            validate: (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
        });

        const amountToWithdraw = parseFloat(withdrawalAmount.withdrawalAmount);

        const user = this.users.get(userId);

        if (user && amountToWithdraw <= user.balance) {
            user.balance -= amountToWithdraw;
            console.log(`Withdrawal successful! Your new balance is $${user.balance}`);
        } else {
            console.log('Insufficient funds. Please choose a smaller amount.');
        }
    }
}

// Create an instance of the ATM and start the simulation
const atm = new ATM();
atm.startATM();
