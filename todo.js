<script>
  const addNoteInput = document.querySelector('.add-note input');
  const addNoteButton = document.querySelector('.add-note .icon-button');
  const taskSection = document.querySelector('.task-section');
  const categories = document.querySelectorAll('.category');

  let tasks = [];

  function renderTasks() {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-list');
    taskSection.querySelectorAll('.task-item').forEach(e => e.remove()); // Clear old

    tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = `task-item ${task.priority}`;
      taskItem.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
        <span class="task-text" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
          ${task.text}
        </span>
        <button class="pin-button" onclick="togglePin(${index})">
          ${task.pinned ? '📌' : '📍'}
        </button>
      `;
      taskSection.appendChild(taskItem);
    });
  }

  function addTask(text) {
    if (!text.trim()) return;
    const priorities = ['high-priority', 'medium-priority', 'low-priority'];
    const newTask = {
      text,
      completed: false,
      pinned: false,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
    };
    tasks.unshift(newTask);
    renderTasks();
    addNoteInput.value = '';
  }

  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  function togglePin(index) {
    tasks[index].pinned = !tasks[index].pinned;
    tasks.sort((a, b) => b.pinned - a.pinned);
    renderTasks();
  }

  addNoteButton.addEventListener('click', () => {
    addTask(addNoteInput.value);
  });

  addNoteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask(addNoteInput.value);
  });

  categories.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.category.active').classList.remove('active');
      button.classList.add('active');
      // Filter logic can go here later
    });
  });

  window.toggleComplete = toggleComplete;
  window.togglePin = togglePin;
</script>
