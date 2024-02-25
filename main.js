document.addEventListener("DOMContentLoaded", function () {
    let todoList = document.querySelector('.todo-list');
    let inputBar = document.querySelector('#input-bar');
    let toggleButton = document.querySelector('#toggle');
    let todoCounter = 0;
    let filterContainer = document.querySelector('.filters');
    let filters = document.querySelectorAll('.filters a');
    let clearCompletedButton = document.querySelector('#clear-completed');

    hideOrShowClearButton(clearCompletedButton);
    hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);

    toggleButton.addEventListener('click', function () {
        toggleButton.style.color = '#000000';
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
        let listItems = document.querySelectorAll('.todo-list li');
        listItems.forEach(listItem => {
            let checkBox = listItem.querySelector('.todo-checkbox');
            let textContent = listItem.querySelector('.item-text');

            if (checkBox.checked) {
                textContent.classList.add('checked-item');
            } else {
                textContent.classList.remove('checked-item');
            }
        });
        if (!allChecked) {
            toggleButton.style.color = '#000000';
        }
        else {
            toggleButton.style.color = '#808080';
        }
        updateItemsLeft();
        hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);
        hideOrShowClearButton(clearCompletedButton);


    });

    filters.forEach(filter => {
        filter.addEventListener('click', function (event) {
            event.preventDefault();
            let filterType = filter.getAttribute('href').slice(2);
            applyFilter(filterType);
        });
    });

    inputBar.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addListItem(inputBar, todoList);
            todoCounter++;
            hideOrShowToggleAndFilter(todoCounter, toggleButton, filterContainer);
        }
    });

    todoList.addEventListener('change', function (event) {
        if (event.target.classList.contains('todo-checkbox')) {
            let checkBoxes = document.querySelectorAll('.todo-checkbox');
            let checkBox = event.target;
            let listItem = checkBox.parentNode;
            let itemText = listItem.querySelector('.item-text');
            let allChecked = true;
            checkBoxes.forEach(checkBox => {
                if (!checkBox.checked) {
                    allChecked = false;
                }
            });
            if (checkBox.checked) {
                itemText.classList.add('checked-item');
            }
            else {
                itemText.classList.remove('checked-item');
            }
            if (!allChecked) {
                toggleButton.style.color = '#808080';
            }
            else {
                toggleButton.style.color = '#000000';
            }
            hideOrShowClearButton(clearCompletedButton);
            updateItemsLeft();
        }
    });

    clearCompletedButton.addEventListener('click', function () {
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

    todoList.addEventListener('click', function (event) {
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
        let listItem = document.createElement('li')
        listItem.id = 'list-item';

        let itemText = document.createElement('p');
        itemText.className = 'item-text';
        itemText.textContent = newItem;
        let label = document.createElement('label');
        let checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.className = 'todo-checkbox';

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.className = 'delete-button';

        label.appendChild(checkBox);
        label.appendChild(itemText);
        listItem.appendChild(label);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);

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
        let checkBox = item.querySelector('.todo-checkbox');
        let completed = checkBox.checked;

        if (filterType === 'all') {
            item.style.display = 'flex';
        } else if (filterType === 'active') {
            item.style.display = completed ? 'none' : 'flex';
        } else if (filterType === 'completed') {
            item.style.display = completed ? 'flex' : 'none';
        }
    });
}

function updateItemsLeft() {
    let itemsLeft = document.getElementById('items-left');
    let totalItems = document.querySelectorAll('.todo-list li').length;
    let checkedItems = findCheckedItems().length;
    let unCheckedItems = totalItems - checkedItems;
    if (unCheckedItems === 1) {
        itemsLeft.textContent = unCheckedItems + ' item left';
    }
    else {
        itemsLeft.textContent = unCheckedItems + ' items left';
    }
}

