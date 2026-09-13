const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");


// Stores tasks
const tasks = [];
// Event listener runs every submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get task name and priority
    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    // Ignore empty tasks
    if (taskName === "") {
        return;
    }

    // Create task object
    const task = {
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    // Add to array and reset input
    tasks.push(task);
    taskInput.value = "";

    displayTasks();
});

function displayTasks() {
    // Clear current list to avoid duplicates
    taskList.innerHTML = "";
    // Repeat for each task
    tasks.forEach(function(task, index) {
        // Create div for task display
        const taskElement = document.createElement("div");
        // Adds classes for styling based on priority
        taskElement.classList.add("task", task.priority);
        // Adds classes for completed tasks
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        // Create text span for task name and priority
        const taskText = document.createElement("span");
        taskText.textContent = `${task.name} — ${task.priority}`;

        // Create complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";

        // Change completion status on click and redisplay tasks
        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;
            displayTasks();
        });

        // Create delete button 
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        // Update array and redisplay
        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            displayTasks();
        });

        // Place task text and buttons in div and adds div to task list
        taskElement.appendChild(taskText);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    });
}