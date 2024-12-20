// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a new task
const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Task cannot be empty!");

  // Create a new list item
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  // Add toggle functionality
  taskItem.addEventListener("click", () => {
    taskItem.classList.toggle("done");
    saveTasks(); //save updated tasks
  });

  // Create a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskItem);
    saveTasks(); // Save updated tasks
  });

  // Append delete button to the task item
  taskItem.appendChild(deleteBtn);

  // Add task item to the list
  taskList.appendChild(taskItem);

  // Clear the input
  taskInput.value = "";
  saveTasks(); // Save tasks after adding
};

// Attach event listener to the button
addTaskBtn.addEventListener("click", addTask);

//Function to save tasks to Local Storage
const saveTasks = () => {
  const tasks = []; // Initialize an empty array to store task details.
  document.querySelectorAll("#taskList li").forEach((task) => {
    tasks.push({
      text: task.firstChild.textContent, // Get the text of the task.
      done: task.classList.contains("done"), // Check if the task is marked as done.
    });
  });
  // Store tasks as a JSON string
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Function to load tasks from Localstorage
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get tasks from localStorage or an empty array if none
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.text;

    //Add 'done' class if the task is marked as done
    if (task.done) {
      taskItem.classList.add("done");
    }

    //Add click event to toggle completion
    taskItem.addEventListener("click", () => {
      taskItem.classList.toggle("done");
      saveTasks(); //Update localStorage when toggling
    });

    // Create and append delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      taskItem.remove();
      saveTasks(); // Update localStorage after deletion
    });
    taskItem.appendChild(deleteBtn);
    document.getElementById('taskList').appendChild(taskItem);
  });
};
// Call loadTasks when the page loads
window.addEventListener('DOMContentLoaded', loadTasks);
