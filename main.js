    document.addEventListener("DOMContentLoaded", function() {
    let todoList = document.querySelector('.todo-list');
    let inputBar = document.querySelector('#input-bar');
    let toggleButton = document.querySelector('#toggle');
    toggleButton.style.visibility = 'hidden';
    let filters = document.querySelectorAll('.filters a');
    let todoCount = document.querySelector('.todo-count');
    let clearCompletedButton = document.querySelector('#clear-completed');
    //eventlistener for input bar
    inputBar.addEventListener('keydown', function(event){
        //so that the code only runs when enter is pressed
       if (event.key === 'Enter') {
        addListItem(inputBar, todoList);
        event.preventDefault();
        //show togglebutton
        toggleButton.style.visibility = 'visible';
       }
    });
    clearCompletedButton.addEventListener('click', function() {
        let completedTodos = findCheckedItems();
        completedTodos.forEach(listItem => todoList.removeChild(listItem));

        
    });
});

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
    console.log('Found checkboxes: ', completedItems);
    return completedItems;
}
