const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');


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
    }
}