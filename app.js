// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

/// Background color changer as mouse moves.
var box = document.querySelector('html');
box.addEventListener('mouseover', runEvent);

function runEvent(e) {
  document.body.style.backgroundColor =
    'rgb(' + e.offsetX + ',' + e.offsetY + ', 50)';
}

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);

  // Remove Task event
  taskList.addEventListener('click', removeTask);

  // Clear Tasks events
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}
// Get tasks from loaclstorage
function getTasks(e) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add a task!');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store task in local storage

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}

// Remove element from LS
function removeTaskFromLS(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all Tasks
function clearTasks(e) {
  // Clear all from LS
  clearAllTasksfromLS();

  //taskList.innerHTML = ''; this is slower

  // this is faster
  // while (taskList.firstChild) {
  //   taskList.removeChild(taskList.firstChild);
  // }
}

// Clearing all tasks from LS
function clearAllTasksfromLS() {
  if (confirm('Would you like to erase eveything?')) {
    localStorage.clear();

    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}

// Filter through tasks.
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  //console.log(text);

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
