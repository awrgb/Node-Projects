#!/usr/bin/env node
import inquirer from 'inquirer';

class BankAccount {
  private balance: number;
  private owner: string;

  constructor(owner: string, initialBalance: number = 0) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  async deposit(): Promise<void> {
    const { amount } = await inquirer.prompt({
      type: 'number',
      name: 'amount',
      message: 'Enter the deposit amount:',
      validate: (input) => input > 0 || 'Please enter a valid amount.',
    });

    this.balance += amount;
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
  }

  async withdraw(): Promise<void> {
    const { amount } = await inquirer.prompt({
      type: 'number',
      name: 'amount',
      message: 'Enter the withdrawal amount:',
      validate: (input) =>
        input > 0 && input <= this.balance || `Please enter a valid amount (1 - ${this.balance}).`,
    });

    this.balance -= amount;
    console.log(`Withdrawn $${amount}. New balance: $${this.balance}`);
  }

  checkBalance(): void {
    console.log(`${this.owner}'s account balance: $${this.balance}`);
  }
}

async function main() {
  const myAccount = new BankAccount('John Doe', 1000);

  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit'],
    });

    switch (action) {
      case 'Check Balance':
        myAccount.checkBalance();
        break;
      case 'Deposit':
        await myAccount.deposit();
        break;
      case 'Withdraw':
        await myAccount.withdraw();
        break;
      case 'Exit':
        console.log('Exiting MyBank application.');
        process.exit();
        break;
    }
  }
}

main();
