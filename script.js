let addColumnButton = document.getElementById('add_column');
let columnNameInput = document.getElementById('column_name');
let addColumnTask = document.getElementById('add_task');
let taskTitleInput = document.getElementById('task_title');
let taskDescInput = document.getElementById('task_desc');
let columns = document.querySelectorAll('.column');
let tasks = document.querySelectorAll('.task');

let numberOfTasks = 0;

//Drag and drop functions
function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = 'yellow';
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    // Make sure user don't drop element on another element
    if(!dropzone.classList.contains("task") && !dropzone.parentElement.classList.contains("task"))
        dropzone.appendChild(draggableElement);

    event
    .dataTransfer
    .clearData();
}

//Create elements
function createNewColumn(){
    const parent = document.querySelector('.container');
    let column = document.createElement('div');
    let title = document.createElement('p');

    //Set new task name
    columnNameInput.value ? title.innerHTML = columnNameInput.value : title.innerHTML = 'New Column';

    column.classList.add('column');
    title.classList.add('column__title');

    column.addEventListener('dragover', onDragOver);
    column.addEventListener('drop', onDrop);

    parent.appendChild(column);
    column.appendChild(title);
}

function createNewTask(){
    const mainColumn = document.getElementById('main_column');
    let task = document.createElement('div');
    let title = document.createElement('p');
    let desc = document.createElement('p');

    //Set task content
    taskTitleInput.value ? title.innerHTML = taskTitleInput.value : title.innerHTML = 'New Task';
    taskDescInput.value ? desc.innerHTML = taskDescInput.value : desc.innerHTML = 'Description';

    numberOfTasks++;

    task.setAttribute("id", `draggable-${numberOfTasks}`);
    task.classList.add('task');
    task.setAttribute("draggable", true);

    title.classList.add('task__title');
    desc.classList.add('task__desc');

    mainColumn.appendChild(task);
    task.appendChild(title);
    task.appendChild(desc);

    task.addEventListener('dragstart', onDragStart);
}

//Events
addColumnButton.addEventListener('click', createNewColumn);
addColumnTask.addEventListener('click', createNewTask);