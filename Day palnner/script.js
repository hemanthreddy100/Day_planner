let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


document.getElementById('dateInput').valueAsDate = new Date();


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const dateInput = document.getElementById('dateInput');

    if (!taskInput.value || !timeInput.value || !dateInput.value) {
        alert('Please fill in all fields!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput.value,
        time: timeInput.value,
        date: dateInput.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    
    // Clear inputs
    taskInput.value = '';
    timeInput.value = '';
}

// Function to  a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const currentDate = document.getElementById('dateInput').value;
    
    const filteredTasks = tasks.filter(task => task.date === currentDate);
    
    filteredTasks.sort((a, b) => a.time.localeCompare(b.time));

    tasksList.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <div>
                <strong>${task.time}</strong> - ${task.text}
            </div>
            <div class="task-actions">
                <button onclick="toggleComplete(${task.id})" class="complete-btn">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="deleteTask(${task.id})" class="delete-btn">Delete</button>
            </div>
        </div>
    `).join('');
}

document.getElementById('dateInput').addEventListener('change', renderTasks);

renderTasks(); 