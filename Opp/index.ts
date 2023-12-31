#!/usr/bin/env node
import inquirer from 'inquirer';

class Person {
  private firstName: string;
  private lastName: string;
  private age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName} and I am ${this.age} years old.`);
  }

  celebrateBirthday(): void {
    this.age++;
    console.log(`Happy Birthday! Now I am ${this.age} years old.`);
  }
}

async function main(): Promise<void> {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'firstName', message: 'Enter first name:' },
    { type: 'input', name: 'lastName', message: 'Enter last name:' },
    { type: 'number', name: 'age', message: 'Enter age:', validate: input => input > 0 || 'Please enter a valid age.' },
  ]);

  const person = new Person(answers.firstName, answers.lastName, answers.age);

  console.log('\nPerson Details:');
  person.greet();

  const { celebrate } = await inquirer.prompt({
    type: 'confirm',
    name: 'celebrate',
    message: 'Do you want to celebrate a birthday?',
  });

  if (celebrate) {
    person.celebrateBirthday();
  }

  console.log('\nExiting the program.');
}

main();
