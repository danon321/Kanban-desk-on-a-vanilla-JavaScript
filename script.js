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

    if(dropzone.classList.contains('column')) // Make sure user drop element on column and nothing else
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
    columnNameInput.value ? title.textContent = columnNameInput.value : title.textContent = 'New Column';

    //Clear input
    columnNameInput.value = '';

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

    numberOfTasks++;

    //Set atributes
    task.setAttribute('id', `task-${numberOfTasks}`);
    task.classList.add('task');
    task.setAttribute('draggable', true);

    title.classList.add('task__title');
    desc.classList.add('task__desc');

    mainColumn.appendChild(task);
    task.appendChild(title);
    task.appendChild(desc);

    task.addEventListener('dragstart', onDragStart);

    //Init Edit mode
    createEditMode(task, [title, desc], [taskTitleInput.value, taskDescInput.value]);

    //Set task content
    taskTitleInput.value ? title.textContent = taskTitleInput.value : title.textContent = 'New Task';
    taskDescInput.value ? desc.textContent = taskDescInput.value : desc.textContent = 'Description';

    //Clear inputs
    taskTitleInput.value = '';
    taskDescInput.value = '';
}

//Edit Task
function createEditMode(editParentEl, editedElementsArr, inputsInitValue){
    let buttonsContainer = document.createElement('div');
    let openEditModeButton = document.createElement('button');
    let closeEditModeButton = document.createElement('button');
    let saveChangesButton = document.createElement('button');

    //Create Edit buttons
    buttonsContainer.classList.add('edit-buttons');
    saveChangesButton.classList.add('edit-buttons__save');
    closeEditModeButton.classList.add('edit-buttons__close');
    openEditModeButton.classList.add('edit-buttons__open');

    openEditModeButton.textContent = 'Edit';
    closeEditModeButton.textContent = 'Close';
    saveChangesButton.textContent = 'Save';

    buttonsContainer.appendChild(saveChangesButton);
    buttonsContainer.appendChild(openEditModeButton);
    buttonsContainer.appendChild(closeEditModeButton);
    editParentEl.appendChild(buttonsContainer);

    //Create Edit inputs and set them init value
    editedElementsArr.forEach((element, index) => {
        let newInput = document.createElement('input');
        newInput.classList.add('edit__input');

        newInput.value = inputsInitValue[index];
        element.after(newInput);
    });

    editParentEl.addEventListener('click', function(e){
        if (e.target.classList.contains('edit-buttons__open')) // I spent like hour to figure this out. ehhh
            openEditMode(editParentEl);

        if (e.target.classList.contains('edit-buttons__close'))
            closeEditMode(editParentEl);

        if (e.target.classList.contains('edit-buttons__save'))
            saveChanges(editParentEl, ['.task__title', '.task__desc']);
    })
}

function saveChanges(parentEl, editElClassArr){
    let currentElID = parentEl.getAttribute('id');

    editElClassArr.forEach( elClass => {
        let editedElement = document.querySelector(`#${currentElID} ${elClass}`);
        let newValue = document.querySelector(`#${currentElID} ${elClass} + .edit__input`);

        if(newValue.value)
            editedElement.textContent = newValue.value;
    });

    closeEditMode(parentEl);
}

function openEditMode(parentEl){
    parentEl.classList.add('edit-mode');
}

function closeEditMode(parentEl){
    parentEl.classList.remove('edit-mode');
}

//Events
document.getElementById('main_column').addEventListener('dragover', onDragOver);
document.getElementById('main_column').addEventListener('drop', onDrop);
addColumnButton.addEventListener('click', createNewColumn);
addColumnTask.addEventListener('click', createNewTask);