// query selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('click', completedTodo);

// functions
function addTodo(event) {
  // prevent default submitting
event.preventDefault();
// TodoDiv
const todoDiv = document.createElement("div");
todoDiv.classList.add('todo');

// create li
const newTodo = document.createElement("li");
newTodo.innerText = todoInput.value;
newTodo.classList.add("todo-item");
todoDiv.appendChild(newTodo);

// create check button
const checkButton = document.createElement("button");
checkButton.innerHTML = '<i class="fas fa-check"></i>';
checkButton.classList.add("check-btn");
todoDiv.appendChild(checkButton);

// create delete button
const deleteButton = document.createElement("button");
deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
deleteButton.classList.add("delete-btn");
todoDiv.appendChild(deleteButton);

// append to list
todoList.appendChild(todoDiv);
// clear todo input value
todoInput.value = "";
}

function completedTodo(e) {
  const todoIem = e.target;
  if (todoIem.classList[0] === "check-btn"){
    const check = todoIem.parentElement;
    check.toggle();
  }
  // todoIem.remove();
}

function deleteTodo(e){
  const todoItem = e.target;

  if(todoItem.classList[0] === "delete-btn"){
    const todo = todoItem.parentElement;
    todo.remove();
  }
}