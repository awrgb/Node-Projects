#!/usr/bin/env node
function calculateTimeRemaining(targetDate) {
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    return Math.max(0, timeDifference); // Ensure the timer doesn't go negative
}
function formatTime(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
function startCountdown(targetDate) {
    const intervalId = setInterval(() => {
        const timeRemaining = calculateTimeRemaining(targetDate);
        if (timeRemaining === 0) {
            console.log('Countdown completed!');
            clearInterval(intervalId);
        }
        else {
            console.clear(); // Clear console to update the countdown
            console.log(`Time remaining: ${formatTime(timeRemaining)}`);
        }
    }, 1000); // Update every second
}
// Example: Set the target date to 24 hours from now
const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 24);
console.log('Countdown starting...');
startCountdown(targetDate);
export {};
