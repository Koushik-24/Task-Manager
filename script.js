let tasks = [];
let currentFilter = 'all';

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;
    const comments = document.getElementById('comments').value;

    if (taskName === '' || dueDate === '' || comments === '') {
        alert('Fields cannot be empty!');
        return;
    }

    const task = {
        name: taskName,
        priority: priority,
        dueDate: dueDate,
        comments: comments,
        completed: false,
    };

    tasks.push(task);
    displayTasks();
    clearForm();
}

function displayTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;

        taskElement.innerHTML = `
    <span>${task.name}</span>
    <span>${task.priority}</span>
    <span>${task.dueDate}</span>
    <span>${task.comments}</span>
    <div class="symbol-buttons">
        <button onclick="toggleTaskStatus(${index})">${task.completed ? 'undo' : '✔'}</button>
        <button onclick="removeTask(${index})">✖</button>
        <button onclick="updateTask(${index})">&#9998;</button>
    </div>
`;

        taskContainer.appendChild(taskElement);
    });

    displayTaskStats();
}



function updateTask(index) {
    const task = tasks[index];
    document.getElementById('taskName').value = task.name;
    document.getElementById('priority').value = task.priority;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('comments').value = task.comments;


    tasks.splice(index, 1);

    displayTasks();
}

function displayTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const activeTasks = tasks.filter(task => !task.completed).length;

    const statsElement = document.querySelector('.task-stats');
    if (statsElement) {
        statsElement.innerHTML = `Total Tasks: ${totalTasks}    |   Active Tasks: ${activeTasks}    |   Completed Tasks: ${completedTasks}`;
    } else {
        const newStatsElement = document.createElement('div');
        newStatsElement.className = 'task-stats';
        newStatsElement.innerHTML = `Total Tasks: ${totalTasks} |   Active Tasks: ${activeTasks}    |   Completed Tasks: ${completedTasks}`;

        const container = document.querySelector('.container');
        container.appendChild(newStatsElement);
    }
}



function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function filterTasks(filterType) {
    currentFilter = filterType;
    displayTasks();
}

function clearForm() {
    document.getElementById('taskName').value = '';
    document.getElementById('priority').value = 'low';
    document.getElementById('dueDate').value = '';
    document.getElementById('comments').value = '';
}

displayTasks();
