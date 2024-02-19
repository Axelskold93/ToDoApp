    document.addEventListener("DOMContentLoaded", function() {
    let todoList = document.querySelector('.todo-list');
    let inputBar = document.querySelector('#input-bar');
    let toggleButton = document.querySelector('#toggle');
    let todoCounter = 0;
    let filters = document.querySelectorAll('.filters a');
    let todoCountText = document.querySelector('.todo-count');
    let clearCompletedButton = document.querySelector('#clear-completed');
    hideOrShowToggle(todoCounter, toggleButton);
    //eventlistener for input bar
    inputBar.addEventListener('keydown', function(event){
        //so that the code only runs when enter is pressed
       if (event.key === 'Enter') {
        addListItem(inputBar, todoList, todoCounter);
        event.preventDefault();
        todoCounter++;
        hideOrShowToggle(todoCounter, toggleButton);
       }
    });
    clearCompletedButton.addEventListener('click', function() {
        let completedTodos = findCheckedItems();
        completedTodos.forEach(listItem => todoList.removeChild(listItem));
        todoCounter -= completedTodos.length;
        hideOrShowToggle(todoCounter, toggleButton); 
    });
});

function hideOrShowToggle(todoCounter, toggleButton) {
    if (todoCounter > 0) {
        toggleButton.style.visibility = 'visible';
    }
    else {
        toggleButton.style.visibility = 'hidden';
    }
}
function addListItem(inputBar, todoList, todoCounter) {
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
