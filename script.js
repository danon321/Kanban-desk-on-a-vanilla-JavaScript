let addColumnButton = document.getElementById('add_column');
let columns = document.querySelectorAll('.column');
let tasks = document.querySelectorAll('.task');

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
    console.log(event);
    event.preventDefault();
}

function onDrop(event) {
    console.log(event);
    const id = event
        .dataTransfer
        .getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    dropzone.appendChild(draggableElement);
    event
    .dataTransfer
    .clearData();
}

function createNewColumn(){
    const parent = document.querySelector('.container');
    let column = document.createElement('div');

    column.classList.add('column');
    column.addEventListener('dragover', onDragOver);
    column.addEventListener('drop', onDrop);
    parent.appendChild(column);
}

//Events
addColumnButton.addEventListener('click', createNewColumn);

columns.forEach( column => {
    column.addEventListener('dragover', onDragOver);
    column.addEventListener('drop', onDrop);
})

tasks.forEach( task => {
    task.addEventListener('dragstart', onDragStart);
})