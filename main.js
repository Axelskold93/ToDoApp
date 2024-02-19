document.addEventListener("DOMContentLoaded", function() {
    let todoList = docment.querySelector('.todo-list');
    let newtoDo = document.querySelector('#input-bar');
    let toggleButton = document.querySelector('#toggle');
    let filters = document.querySelectorAll('.filters a');
    let todoCount = document.querySelector('.todo-count');
    let clearCompletedButton = document.querySelector('.clear-completed');

    clearCompletedButton.addEventListener('click', function() {
        const completedTodos = document.querySelectorAll('.todo-item.completed');
        completedTodos.forEach(todoItem => todoList.removeChild(todoItem));

        
    });
});