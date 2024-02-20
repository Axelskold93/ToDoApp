    document.addEventListener("DOMContentLoaded", function() {
    let todoList = document.querySelector('.todo-list');
    let inputBar = document.querySelector('#input-bar');
    let toggleButton = document.querySelector('#toggle');
    let todoCounter = 0;
    let filterContainer = document.querySelector('.filters');
    let filters = document.querySelectorAll('.filters a');
    let clearCompletedButton = document.querySelector('#clear-completed');
    hideOrShowClearButton(clearCompletedButton);
    
    
    hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);

    toggleButton.addEventListener('click', function() {
        let checkBoxes = document.querySelectorAll('.todo-checkbox');
        let allChecked = true;
    
        checkBoxes.forEach(checkBox => {
            if (!checkBox.checked) {
                allChecked = false;
            }
        });
    
        checkBoxes.forEach(checkBox => {
            checkBox.checked = !allChecked;
        });

        updateItemsLeft();
        hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);
        hideOrShowClearButton(clearCompletedButton);
    });

    filters.forEach(filter => {
        filter.addEventListener('click', function(event) {
            event.preventDefault(); 
            let filterType = filter.getAttribute('href').slice(2); 
            applyFilter(filterType); 
        });
    });
    //eventlistener for input bar
    inputBar.addEventListener('keydown', function(event){
        //so that the code only runs when enter is pressed
       if (event.key === 'Enter') {
        event.preventDefault();
        addListItem(inputBar, todoList);
        todoCounter++;
        hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);
        
        
       }
    });
    todoList.addEventListener('change', function(event) {
        if (event.target.classList.contains('todo-checkbox')) {
            hideOrShowClearButton(clearCompletedButton); // Update clear button visibility
            updateItemsLeft();
        }
    });
   
    clearCompletedButton.addEventListener('click', function() {
        event.preventDefault();
        let completedTodos = findCheckedItems();
    
        if (completedTodos.length > 0) {
        completedTodos.forEach(listItem => todoList.removeChild(listItem));
        todoCounter -= completedTodos.length;
        updateItemsLeft();
        hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);
        hideOrShowClearButton(clearCompletedButton); 
        }   
    });
    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            let listItem = event.target.parentNode;
            todoList.removeChild(listItem);
            todoCounter -= 1;
            updateItemsLeft();
            hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);
        hideOrShowClearButton(clearCompletedButton);
        }
    })
    
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

function hideOrShowClearButton(clearCompletedButton) {
    let boxChecked = findCheckedItems();
    if (boxChecked.length > 0) {
        clearCompletedButton.style.visibility = 'visible';
    } else {
        clearCompletedButton.style.visibility = 'hidden';
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

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.className = 'delete-button';

        //append items to ul
        
        listItem.appendChild(checkBox);
        listItem.appendChild(document.createTextNode(newItem));
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        //reset the input bar
        inputBar.value = '';
        updateItemsLeft();

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


function applyFilter(filterType) {
    let todoItems = document.querySelectorAll('.todo-list > *');
    todoItems.forEach(item => {
        if (filterType === 'all') {
            item.style.display = 'block'; 
        } else if (filterType === 'active') {
            let checkBox = item.querySelector('.todo-checkbox');
            if (!checkBox.checked) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none';
            }
        } else if (filterType === 'completed') {
            let completedItems = findCheckedItems();
            if (completedItems.includes(item)) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none';
            }
        }
    });
}
function updateItemsLeft() {
    let itemsLeft = document.getElementById('items-left');
    let totalItems = document.querySelectorAll('.todo-list li').length;
    let checkedItems = findCheckedItems().length;
    unCheckedItems = totalItems - checkedItems;
    if (unCheckedItems === 1) {
    itemsLeft.textContent = unCheckedItems + ' item left';
    }
    else {
        itemsLeft.textContent = unCheckedItems + ' items left';
    }
}

