const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const removeAllButton = document.getElementById('remove-all');

function addTask() {
    if (inputBox.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value ;
        listContainer.appendChild(li);
        // ' <span class="delete" onclick="deleteTask(this)">Delete</span>'
        inputBox.value = ""; 
        let span = document.createElement("span");
        span.innerHTML = "\u2716"; 
        li.appendChild(span);
        
        saveData();
    }
}


listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false) ; 


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();
removeAllButton.addEventListener('click', function () {
    const listItems = listContainer.querySelectorAll('li');
    listItems.forEach((item, index) => {
        // Add a delay for each item to create a staggered effect
        setTimeout(() => {
            item.style.opacity = '0'; // Fade out
            item.style.height = '0'; // Collapse height
            item.style.margin = '0'; // Remove margin
            item.style.padding = '0'; // Remove padding
        }, index * 100); // Delay increases for each item
    });

    // Remove all items after the animation
    setTimeout(() => {
        listContainer.innerHTML = '';
        saveData();
    }, listItems.length * 100 + 300); // Wait for all animations to complete
});



const todoApp = document.querySelector('.todo-app'); // Select the to-do container
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Function to center the container
function centerTodoApp() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const todoAppRect = todoApp.getBoundingClientRect();

    // Calculate the center position
    const centerX = (containerRect.width - todoAppRect.width) / 2;
    const centerY = (containerRect.height - todoAppRect.height) / 4;

    // Set the position
    todoApp.style.left = `${centerX}px`;
    todoApp.style.top = `${centerY}px`;
}

// Center the container on page load
centerTodoApp();

// Mouse down event to start dragging
todoApp.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - todoApp.offsetLeft;
    offsetY = e.clientY - todoApp.offsetTop;
    todoApp.style.cursor = 'grabbing'; // Change cursor to indicate dragging
    todoApp.style.transition = 'none'; // Disable smooth transition while dragging
});

// Mouse move event to drag the container
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        todoApp.style.position = 'absolute';
        todoApp.style.left = `${e.clientX - offsetX}px`;
        todoApp.style.top = `${e.clientY - offsetY}px`;
    }
});

// Mouse up event to stop dragging and return to center
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        todoApp.style.cursor = 'grab'; // Reset cursor
        todoApp.style.transition = 'all 0.5s ease'; // Smooth transition back to center
        centerTodoApp(); // Return to center
    }
});