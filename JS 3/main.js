import getUserInput from "./modules.js";
import { 
    convertToJson, 
    saveToLocalStorage, 
    getFromLocalStorage, 
    isPositive, 
    operateOnNumbers, 
    fetchData 
} from "./modules.js";

document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("output");
    const loadBtn = document.getElementById("loadBtn");
    const clearBtn = document.getElementById("clearBtn");

    const handleLoadData = async () => {
        // 1. Loading state
        display.innerHTML = "<p><em>Loading data from API...</em></p>";

        try {
            const number = getUserInput();
            const isPositiveNumber = isPositive(number);
            const sum = operateOnNumbers(number || 0, 10, (a, b) => a + b);
            
            const userData = { input: number, timestamp: new Date().toLocaleTimeString() };
            saveToLocalStorage("lastRun", convertToJson(userData));
            
            // Safety check for localStorage
            const rawCache = getFromLocalStorage("lastRun");
            const cached = rawCache ? JSON.parse(rawCache) : { timestamp: "N/A" };

            const apiUrl = "https://jsonplaceholder.typicode.com/todos"; 
            const todos = await fetchData(apiUrl);

            // Debugging: Open your browser console (F12) to see if this appears
            console.log("Fetched Todos:", todos);

            if (!todos || todos.length === 0) {
                display.innerHTML = "<p>No data received from the API.</p>";
                return;
            }

            // 2. Build the Table
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th class="center-text">User ID</th>
                            <th class="center-text">Task ID</th>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Use forEach or map to build rows
            todos.forEach(todo => {
                tableHTML += `
                    <tr>
                        <td class="center-text">${todo.userId}</td>
                        <td class="center-text">${todo.id}</td>
                        <td>${todo.title}</td>
                        <td class="${todo.completed ? 'status-completed' : 'status-pending'}">
                            ${todo.completed ? "Completed" : "Not yet Completed"}
                        </td>
                    </tr>
                `;
            });

            tableHTML += `</tbody></table>`;

            // 3. Render everything
            display.innerHTML = `
                <div style="margin-bottom: 20px; padding: 10px; border: 1px dashed #ccc; background: #fff;">
                    <strong>Analysis:</strong> Input: ${number} | Sum: ${sum} | Saved: ${cached.timestamp}
                </div>
                ${tableHTML}
            `;

        } catch (error) {
            console.error("Error in handleLoadData:", error);
            display.innerHTML = `<p style="color:red;">Error loading data. Check console for details.</p>`;
        }
    };

    const handleClear = () => {
        display.innerHTML = "<p>Waiting for user input...</p>";
    };

    loadBtn.addEventListener("click", handleLoadData);
    clearBtn.addEventListener("click", handleClear);
});