/*Student Name: Dejonte Maxwell
Student ID: 2301519
Module: CIT2011 - Web Programming
Assignment: Week 8 - Interactive Task Manager
Description: 
This program manages tasks using JavaScript functions,
objects, arrays, events, JSON and localStorage.*/
// 1. GLOBAL ARRAY
// Stores all task records.
let myTasks = [];
// DECLARE DOM ELEMENTS
const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-list");
const searchBar = document.getElementById("search-bar");
// LOAD TASKS FROM LOCAL STORAGE
function loadTasks() {
    const storedTasks = localStorage.getItem("myTasks");
    if (storedTasks) {
        myTasks = JSON.parse(storedTasks);
    } else {
        myTasks = [];
    }
}
// RENDER TASKS ON THE BROWSER
function renderTasks(tasksToDisplay) {
    taskContainer.innerHTML = "";
    tasksToDisplay.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("task-item");
        card.classList.add(task.priority);
        if (task.completed) {
            card.classList.add("completed");
        }
        // Create task information
        const title = document.createElement("span");
        title.textContent = task.title;
        // Create action buttons container
        const actions = document.createElement("div");
        actions.classList.add("task-actions");
        // Toggle button
        const toggleButton = document.createElement("button");
        toggleButton.textContent = task.completed ? "Undo" : "Complete";
        toggleButton.classList.add("btn-toggle");
        toggleButton.dataset.id = task.id;
        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn-delete");
        deleteButton.dataset.id = task.id;
        // Add buttons to actions container
        actions.appendChild(toggleButton);
        actions.appendChild(deleteButton);
        // Add task details to card
        card.appendChild(title);
        card.appendChild(actions);
        // Add card to task container
        taskContainer.appendChild(card);
    });
}
// SAVE TASKS TO LOCAL STORAGE
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
}
// HANDLE ADDING TASKS
function handleAddTask(event) {
    event.preventDefault();
    const title = document.getElementById("task-title").value.trim();
    const priority = document.getElementById("task-priority").value;
    if (title === "") {
        alert("Please enter a task description.");
        return;
    }
    // Create a new task object
    const newTask = {
        id: Date.now(),
        title: title,
        priority: priority,
        completed: false
    };
    // Add new task to global array
    myTasks.push(newTask);
    // Save tasks to local storage
    saveTasks();
    // Display updated task list
    renderTasks(myTasks);
    // Reset form
    taskForm.reset();
}
// HANDLE TASK BUTTON CLICKS
function handleTaskClick(event) {
    // Check if the clicked element is a button
    if (!event.target.closest("button")) {
        return;
    }
    // Get the task ID from the clicked button
    const taskId = Number(event.target.dataset.id);
    // Check if Delete button was clicked
    if (event.target.classList.contains("btn-delete")) {
        myTasks = myTasks.filter(task => task.id !== taskId);
    }
    // Check if Complete button was clicked
    else if (event.target.classList.contains("btn-toggle")) {
        myTasks = myTasks.map(task => {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }
            return task;
        });
    }
    // Save updated tasks
    saveTasks();
    // Display updated task list
    renderTasks(myTasks);
}
// SEARCH TASKS
function searchTasks() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredTasks = myTasks.filter(task => {
        return task.title.toLowerCase().includes(searchTerm);
    });
    renderTasks(filteredTasks);
}
// EVENT LISTENERS
// Listen for form submission
taskForm.addEventListener("submit", handleAddTask);
// Listen for clicks inside the task container
taskContainer.addEventListener("click", handleTaskClick);
// Listen for search input
searchBar.addEventListener("input", searchTasks);

// INITIALIZE TASK MANAGER
// Load saved tasks
loadTasks();
// Display saved tasks
renderTasks(myTasks);