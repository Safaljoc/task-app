// Get DOM elements
const addNoteInput = document.querySelector('.add-note input');
const addNoteButton = document.querySelector('.add-note .icon-button');
const taskSection = document.querySelector('.task-section');
const categoryButtons = document.querySelectorAll('.category');

// Store tasks
let tasks = [];

// Create and return task HTML element
function createTaskElement(task, index) {
  const taskItem = document.createElement('div');
  taskItem.className = `task-item ${task.priority}`;

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    tasks[index].completed = checkbox.checked;
    renderTasks();
  });

  // Task text
  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = task.text;
  if (task.completed) {
    taskText.style.textDecoration = 'line-through';
    taskText.style.opacity = '0.6';
  }

  // Pin button
  const pinBtn = document.createElement('button');
  pinBtn.className = 'pin-button';
  pinBtn.textContent = task.pinned ? '📌' : '📍';
  pinBtn.addEventListener('click', () => {
    tasks[index].pinned = !task.pinned;
    renderTasks();
  });

  // Assemble task item
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(pinBtn);

  return taskItem;
}

// Render all tasks
function renderTasks() {
  const oldTasks = taskSection.querySelectorAll('.task-item');
  oldTasks.forEach(el => el.remove());

  const sortedTasks = [...tasks].sort((a, b) => b.pinned - a.pinned);
  sortedTasks.forEach((task, index) => {
    const taskEl = createTaskElement(task, index);
    taskSection.appendChild(taskEl);
  });
}

// Add new task
function addTask(text) {
  if (!text.trim()) return;

  const priorities = ['high-priority', 'medium-priority', 'low-priority'];
  const newTask = {
    text: text.trim(),
    completed: false,
    pinned: false,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  };

  tasks.push(newTask);
  renderTasks();
  addNoteInput.value = '';
}

// Event Listeners
addNoteButton.addEventListener('click', () => {
  addTask(addNoteInput.value);
});

addNoteInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask(addNoteInput.value);
  }
});

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.category.active').classList.remove('active');
    btn.classList.add('active');
    // Category filter logic can be added here
  });
});
