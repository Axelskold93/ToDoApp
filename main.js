    document.addEventListener("DOMContentLoaded", function() {
    let todoList = document.querySelector('.todo-list');
    let inputBar = document.querySelector('#input-bar');
    let toggleButton = document.querySelector('#toggle');
    let todoCounter = 0;
    let filterContainer = document.querySelector('.filters');
    let filters = document.querySelectorAll('.filters a');
    let todoCountText = document.querySelector('.todo-count');
    let clearCompletedButton = document.querySelector('#clear-completed');
    hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);
    //eventlistener for input bar
    inputBar.addEventListener('keydown', function(event){
        //so that the code only runs when enter is pressed
       if (event.key === 'Enter') {
        addListItem(inputBar, todoList, todoCounter);
        event.preventDefault();
        todoCounter++;
        hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);
       }
    });
    clearCompletedButton.addEventListener('click', function() {
        event.preventDefault();
        let completedTodos = findCheckedItems();
        console.log(completedTodos);
        if (completedTodos.length > 0) {
        completedTodos.forEach(listItem => todoList.removeChild(listItem));
        todoCounter -= completedTodos.length;
        hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer); 
        }   
    });
});

function hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer) {
    if (todoCounter > 0) {
        toggleButton.style.visibility = 'visible';
        filterContainer.style.visibility = 'visible';

    }
    else {
        toggleButton.style.visibility = 'hidden';
        filterContainer.style.visibility = 'hidden';
    }
}

function addListItem(inputBar, todoList) {
    let newItem = inputBar.value;
    if (newItem !== '') {
        //create li element
        let listItem = document.createElement('li')
        listItem.id = 'list-item';
        //create checkbox
        let checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.className = 'todo-checkbox';
        //append items to ul
        listItem.appendChild(checkBox);
        listItem.appendChild(document.createTextNode(newItem));
        todoList.appendChild(listItem);
        //reset the input bar
        inputBar.value = '';

    }
}
function findCheckedItems() {
    let checkBoxes = document.getElementsByClassName('todo-checkbox');
    let completedItems = [];
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            completedItems.push(checkBoxes[i].parentNode);
        }
    }
    return completedItems;
}
