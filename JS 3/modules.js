// Module 1: User Input handling (with validation)
export default function getUserInput() {
    const userInput = prompt("Enter a number:");
    const parsed = parseInt(userInput);
    // Returns 0 if input is NaN (Not a Number) or empty
    return isNaN(parsed) ? 0 : parsed;
};

// Module 2: Classes
export class Calculator {
    static add = (a, b) => a + b;
    static subtract = (a, b) => a - b;
}

// Module 3: JSON
export const convertToJson = (data) => JSON.stringify(data);

// Module 4: Web Storage
export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.error("LocalStorage save failed", e);
    }
};

export const getFromLocalStorage = (key) => localStorage.getItem(key);

// Module 5: Ternary Operator
export const isPositive = (number) => (number > 0) ? true : false;

// Module 6: Higher Order Functions
export const operateOnNumbers = (a, b, operation) => operation(a, b);

// Module 7: Fetch API (Async/Await)
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Detailed Fetch Error:", error);
        // Returning an empty array prevents .map() from breaking in main.js
        return [];
    }
};