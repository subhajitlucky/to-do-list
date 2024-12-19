// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to add a new task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return alert('Task cannot be empty!');

    // Create a new list item
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Add toggle functionality
    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('done');
    });

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    // Append delete button to the task item
    taskItem.appendChild(deleteBtn);

    // Add task item to the list
    taskList.appendChild(taskItem);

    // Clear the input
    taskInput.value = '';
};

// Attach event listener to the button
addTaskBtn.addEventListener('click', addTask);
