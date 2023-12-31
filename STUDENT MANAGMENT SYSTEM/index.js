#!/usr/bin/env node
import inquirer from 'inquirer';
class Student {
    id;
    name;
    courses;
    balance;
    static nextStudentId = 10000;
    constructor(id, name, courses = [], balance = 0) {
        this.id = id;
        this.name = name;
        this.courses = courses;
        this.balance = balance;
    }
    enroll(course) {
        this.courses.push(course);
        console.log(`${this.name} is enrolled in ${course}`);
    }
    viewBalance() {
        console.log(`${this.name}'s balance: $${this.balance}`);
    }
    payTuition(amount) {
        if (amount <= 0 || amount > this.balance) {
            console.log('Invalid payment amount. Please enter a valid amount.');
            return;
        }
        this.balance -= amount;
        console.log(`${this.name} paid $${amount}. Remaining balance: $${this.balance}`);
    }
    showStatus() {
        console.log(`
      Student Information:
      Name: ${this.name}
      Student ID: ${this.id}
      Courses Enrolled: ${this.courses.join(', ')}
      Balance: $${this.balance}
    `);
    }
}
const students = [];
async function getUserInput() {
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Student', 'Enroll Student', 'View Balance', 'Pay Tuition', 'Show Status', 'Exit'],
        },
        {
            type: 'input',
            name: 'student',
            message: 'Enter student name:',
            when: (answers) => answers.action === 'Add Student',
        },
        {
            type: 'input',
            name: 'course',
            message: 'Enter course name:',
            when: (answers) => answers.action === 'Enroll Student',
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter payment amount:',
            when: (answers) => answers.action === 'Pay Tuition',
            validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
    ]);
}
async function main() {
    try {
        while (true) {
            const { action, student, course, amount } = await getUserInput();
            switch (action) {
                case 'Add Student':
                    if (student) {
                        const newStudent = new Student(Student.nextStudentId++, student.trim());
                        students.push(newStudent);
                        console.log(`${newStudent.name} added with Student ID: ${newStudent.id}`);
                    }
                    else {
                        console.log('Error: Student name is missing.');
                    }
                    break;
                case 'Enroll Student':
                    if (course) {
                        const studentName = await selectStudent();
                        const currentStudent = students.find((s) => s.name === studentName);
                        if (currentStudent) {
                            currentStudent.enroll(course);
                        }
                        else {
                            console.log('Error: Student not found.');
                        }
                    }
                    else {
                        console.log('Error: Course name is missing.');
                    }
                    break;
                case 'View Balance':
                case 'Pay Tuition':
                case 'Show Status':
                    const studentName = await selectStudent();
                    const currentStudent = students.find((s) => s.name === studentName);
                    if (currentStudent) {
                        switch (action) {
                            case 'View Balance':
                                currentStudent.viewBalance();
                                break;
                            case 'Pay Tuition':
                                currentStudent.payTuition(amount || 0);
                                break;
                            case 'Show Status':
                                currentStudent.showStatus();
                                break;
                        }
                    }
                    else {
                        console.log('Error: Student not found.');
                    }
                    break;
                case 'Exit':
                    console.log('Exiting Student Management System.');
                    process.exit();
                    break;
                default:
                    console.log('Invalid action. Please try again.');
            }
        }
    }
    catch (error) {
        console.error(error.message);
    }
}
async function selectStudent() {
    const { student } = await inquirer.prompt([
        {
            type: 'list',
            name: 'student',
            message: 'Select a student:',
            choices: students.map((student) => student.name),
        },
    ]);
    return student;
}
main();
