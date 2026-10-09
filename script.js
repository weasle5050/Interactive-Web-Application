// Real-time Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Counter Functionality
let counter = 0;
const counterDisplay = document.getElementById('counter');

function updateCounterDisplay() {
    counterDisplay.textContent = counter;
    counterDisplay.classList.add('pulse');
    setTimeout(() => counterDisplay.classList.remove('pulse'), 300);
}

document.getElementById('increment').addEventListener('click', () => {
    counter++;
    updateCounterDisplay();
});

document.getElementById('decrement').addEventListener('click', () => {
    counter--;
    updateCounterDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
    counter = 0;
    updateCounterDisplay();
});

// Interactive Form Validation
const form = document.getElementById('interactiveForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
const formFeedback = document.getElementById('formFeedback');

// Character count for message
messageInput.addEventListener('input', () => {
    const count = messageInput.value.length;
    charCount.textContent = count;
    if (count > 500) {
        charCount.style.color = 'var(--danger-color)';
    } else {
        charCount.style.color = 'var(--secondary-color)';
    }
});

// Form validation
function validateForm() {
    let isValid = true;

    // Username validation
    if (usernameInput.value.trim().length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters';
        isValid = false;
    } else {
        document.getElementById('usernameError').textContent = '';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Message validation
    if (messageInput.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    } else {
        document.getElementById('messageError').textContent = '';
    }

    return isValid;
}

// Real-time validation on input
usernameInput.addEventListener('input', () => {
    if (usernameInput.value.trim().length >= 3) {
        document.getElementById('usernameError').textContent = '';
    }
});

emailInput.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput.value)) {
        document.getElementById('emailError').textContent = '';
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 10) {
        document.getElementById('messageError').textContent = '';
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulate form submission
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = 'Form submitted successfully! Thank you for your feedback.';
        
        // Reset form
        form.reset();
        charCount.textContent = '0';
        
        // Hide feedback after 3 seconds
        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 3000);
    } else {
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fix the errors above before submitting.';
    }
});

// Dynamic To-Do List
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

let todos = [];

function updateTodoStats() {
    totalTasks.textContent = todos.length;
    completedTasks.textContent = todos.filter(todo => todo.completed).length;
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
            <span>${todo.text}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        todoList.appendChild(li);
    });
    updateTodoStats();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        renderTodos();
    }
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.dataset.index);
        todos.splice(index, 1);
        renderTodos();
    } else if (e.target.type === 'checkbox') {
        const index = parseInt(e.target.dataset.index);
        todos[index].completed = e.target.checked;
        renderTodos();
    }
});

// Real-time Data Display
const mousePos = document.getElementById('mousePos');
const clickCountDisplay = document.getElementById('clickCount');
const keyCountDisplay = document.getElementById('keyCount');
const sessionTimeDisplay = document.getElementById('sessionTime');

let clickCount = 0;
let keyCount = 0;
let sessionStartTime = Date.now();

// Mouse position tracking
document.addEventListener('mousemove', (e) => {
    mousePos.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
});

// Click count tracking
document.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
    clickCountDisplay.classList.add('pulse');
    setTimeout(() => clickCountDisplay.classList.remove('pulse'), 300);
});

// Keystroke tracking
document.addEventListener('keypress', () => {
    keyCount++;
    keyCountDisplay.textContent = keyCount;
});

// Session time tracking
function updateSessionTime() {
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    sessionTimeDisplay.textContent = `${minutes}:${seconds}`;
}
setInterval(updateSessionTime, 1000);

// Theme Customizer
const primaryColorInput = document.getElementById('primaryColor');
const bgColorInput = document.getElementById('bgColor');
const applyThemeBtn = document.getElementById('applyTheme');

applyThemeBtn.addEventListener('click', () => {
    const primaryColor = primaryColorInput.value;
    const bgColor = bgColorInput.value;
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--bg-color', bgColor);
    
    // Update header gradient
    const header = document.querySelector('header');
    header.style.background = `linear-gradient(135deg, ${primaryColor}, ${adjustColor(primaryColor, -20)})`;
    
    // Visual feedback
    applyThemeBtn.textContent = 'Theme Applied!';
    setTimeout(() => {
        applyThemeBtn.textContent = 'Apply Theme';
    }, 1000);
});

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Initialize
updateTodoStats();
