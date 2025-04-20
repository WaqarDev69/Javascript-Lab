// Selectors
let taskList = document.querySelector('.task-list');
let taskCount = document.querySelector('.task-count');
let taskInput = document.getElementById('taskInput');
let addTaskBtn = document.getElementById('addTask');
let clearTasksBtn = document.getElementById('clearTasks');
const dateElement = document.querySelector('.date');

// Dynamic Date
const currentDate = new Date();
dateElement.textContent = currentDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});
taskList.addEventListener('change', checkTask);
taskList.addEventListener('click', handleTaskActions);
clearTasksBtn.addEventListener('click', clearAllTasks);

// Load tasks on start
document.addEventListener('DOMContentLoaded', () => {
    tasks.forEach(task => createTaskElement(task));
    updateTaskCount();
});

function addTask() {
    let inputVal = taskInput.value.trim();
    if (!inputVal) return;

    const newTask = {
        id: Date.now(),
        title: inputVal,
        completed: false,
        quote: ''
    };

    fetchRandomQuote().then(quote => {
        newTask.quote = quote;
        tasks.push(newTask);
        createTaskElement(newTask);
        saveToLocalStorage();
        updateTaskCount();
        taskInput.value = '';
    });
}

function createTaskElement(task) {
    const taskItem = document.createElement('li');
    taskItem.setAttribute('id', task.id);

    taskItem.innerHTML = `
    <div class="task-item">
        <div>
            <input type="checkbox" class="check-box" ${task.completed ? 'checked' : ''}/>
            <span class="title" style="text-decoration: ${task.completed ? 'line-through' : 'none'}; color: ${task.completed ? 'grey' : 'white'}">
                ${task.title}
            </span>
        </div>
        <p class="quote">"${task.quote || 'Loading...'}"</p>
        <div>
            <button class="delete">🗑️</button>
        </div>
    </div>`;
    taskList.appendChild(taskItem);
}

function checkTask(e) {
    if (!e.target.classList.contains('check-box')) return;
    const taskId = parseInt(e.target.closest('li').id);
    const task = tasks.find(t => t.id === taskId);
    task.completed = e.target.checked;

    const title = e.target.nextElementSibling;
    title.style.textDecoration = task.completed ? 'line-through' : 'none';
    title.style.color = task.completed ? 'grey' : 'white';

    saveToLocalStorage();
}

function handleTaskActions(e) {
    const taskId = parseInt(e.target.closest('li').id);

    if (e.target.classList.contains('delete')) {
        tasks = tasks.filter(task => task.id !== taskId);
        document.getElementById(taskId).remove();
        saveToLocalStorage();
        updateTaskCount();
    }

    if (e.target.classList.contains('edit')) {
        const task = tasks.find(task => task.id === taskId);
        const newTitle = prompt("Edit Task", task.title);
        if (newTitle && newTitle.trim() !== '') {
            task.title = newTitle.trim();
            document.querySelector(`#${taskId} .title`).textContent = task.title;
            saveToLocalStorage();
        }
    }
}

function clearAllTasks() {
    tasks = [];
    taskList.innerHTML = '';
    updateTaskCount();
    saveToLocalStorage();
}

function updateTaskCount() {
    taskCount.textContent = `${tasks.length} Tasks`;
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
async function fetchRandomQuote() {
    try {
        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random") + "&rand=" + Math.random());
        const data = await response.json();
        const parsed = JSON.parse(data.contents);
        return parsed[0].q + " — " + parsed[0].a;
    } catch (err) {
        return "No quote available";
    }
}




