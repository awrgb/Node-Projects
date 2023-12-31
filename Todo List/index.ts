#!/usr/bin/env node
import inquirer from 'inquirer';

interface Task {
    id: number;
    description: string;
    completed: boolean;
}

class TodoApp {
    private tasks: Task[];
    private taskIdCounter: number;

    constructor() {
        this.tasks = [];
        this.taskIdCounter = 1;
    }

    displayMenu(): void {
        console.log('=== Todo App ===');
        console.log('1. View Tasks');
        console.log('2. Add Task');
        console.log('3. Mark Task as Completed');
        console.log('4. Quit');
    }

    async run(): Promise<void> {
        let choice: string = '';

        while (choice !== '4') {
            this.displayMenu();
            choice = await this.getUserChoice();

            switch (choice) {
                case '1':
                    this.viewTasks();
                    break;
                case '2':
                    await this.addTask();
                    break;
                case '3':
                    await this.markTaskAsCompleted();
                    break;
                case '4':
                    console.log('Goodbye!');
                    break;
                default:
                    console.log('Invalid choice. Please try again.');
            }
        }
    }

    async getUserChoice(): Promise<string> {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'choice',
            message: 'Enter your choice: ',
            validate: (value) => {
                const input = value.trim();
                return ['1', '2', '3', '4', '5', '6'].includes(input) ? true : 'Invalid choice. Please enter 1, 2, 3, or 4.';
            },
        });

        return answer.choice.trim();
    }

    viewTasks(): void {
        if (this.tasks.length === 0) {
            console.log('No tasks available.');
        } else {
            console.log('=== Tasks ===');
            this.tasks.forEach((task) => {
                const status = task.completed ? 'Completed' : 'Not Completed';
                console.log(`${task.id}. ${task.description} - ${status}`);
            });
        }
    }

    async addTask(): Promise<void> {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'description',
            message: 'Enter task description: ',
            validate: (value) => value.trim() !== '' ? true : 'Please enter a valid task description.',
        });

        const newTask: Task = {
            id: this.taskIdCounter,
            description: answer.description.trim(),
            completed: false,
        };

        this.tasks.push(newTask);
        this.taskIdCounter++;

        console.log(`Task "${newTask.description}" added.`);
    }

    async markTaskAsCompleted(): Promise<void> {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'taskId',
            message: 'Enter the task ID to mark as completed: ',
            validate: (value) => {
                const taskId = parseInt(value.trim());
                return this.isValidTaskId(taskId) ? true : 'Invalid task ID. Please enter a valid ID.';
            },
        });

        const taskId = parseInt(answer.taskId.trim());
        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            this.tasks[taskIndex].completed = true;
            console.log(`Task "${this.tasks[taskIndex].description}" marked as completed.`);
        } else {
            console.log('Task not found.');
        }
    }

    isValidTaskId(taskId: number): boolean {
        return this.tasks.some((task) => task.id === taskId);
    }
}

// Instantiate and run the TodoApp
const todoApp = new TodoApp();
todoApp.run();
