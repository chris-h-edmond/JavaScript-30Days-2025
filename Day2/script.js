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


const dragContainer = document.querySelector('.drag-container'); // Select the draggable container
const todoApp = document.querySelector('.todo-app'); // Select the inner to-do app
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Function to center the container
function centerTodoApp() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const dragContainerRect = dragContainer.getBoundingClientRect();

    // Calculate the center position
    const centerX = (containerRect.width - dragContainerRect.width) / 2;
    const centerY = (containerRect.height - dragContainerRect.height) / 2;

    // Set the position
    dragContainer.style.left = `${centerX}px`;
    dragContainer.style.top = `${centerY}px`;
}

// Center the container on page load
centerTodoApp();

// Mouse down event to start dragging
dragContainer.addEventListener('mousedown', (e) => {
    // Prevent dragging if the click is inside the .todo-app
    if (todoApp.contains(e.target)) {
        return;
    }
    isDragging = true;
    offsetX = e.clientX - dragContainer.offsetLeft;
    offsetY = e.clientY - dragContainer.offsetTop;
    dragContainer.style.cursor = 'grabbing'; // Change cursor to indicate dragging
    dragContainer.style.transition = 'none'; // Disable smooth transition while dragging
});

// Mouse move event to drag the container
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        dragContainer.style.position = 'absolute';
        dragContainer.style.left = `${e.clientX - offsetX}px`;
        dragContainer.style.top = `${e.clientY - offsetY}px`;
    }
});

// Mouse up event to stop dragging and return to center
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        dragContainer.style.cursor = 'grab'; // Reset cursor
        dragContainer.style.transition = 'all 0.5s ease'; // Smooth transition back to center
        centerTodoApp(); // Return to center
    }
});


// WATERMARK 




const watermark = document.querySelector('.watermark'); // Select the watermark div
let isDraggingWatermark = false;
let offsetXWatermark = 0;
let offsetYWatermark = 0;

// Store the initial position of the watermark
const initialWatermarkPosition = {
    top: watermark.offsetTop,
    left: watermark.offsetLeft,
};

// Mouse down event to start dragging the watermark
watermark.addEventListener('mousedown', (e) => {
    isDraggingWatermark = true;
    offsetXWatermark = e.clientX - watermark.offsetLeft;
    offsetYWatermark = e.clientY - watermark.offsetTop;
    watermark.style.cursor = 'grabbing'; // Change cursor to indicate dragging
    watermark.style.transition = 'none'; // Disable smooth transition while dragging
});

// Mouse move event to drag the watermark
document.addEventListener('mousemove', (e) => {
    if (isDraggingWatermark) {
        watermark.style.position = 'absolute';
        watermark.style.left = `${e.clientX - offsetXWatermark}px`;
        watermark.style.top = `${e.clientY - offsetYWatermark}px`;
    }
});

// Mouse up event to stop dragging and return to the initial position
document.addEventListener('mouseup', () => {
    if (isDraggingWatermark) {
        isDraggingWatermark = false;
        watermark.style.cursor = 'grab'; // Reset cursor
        watermark.style.transition = 'all 0.5s ease'; // Smooth transition back to initial position
        watermark.style.left = `${initialWatermarkPosition.left}px`;
        watermark.style.top = `${initialWatermarkPosition.top}px`;
    }
});
