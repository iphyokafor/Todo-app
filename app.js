// query selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('click', completedTodo);
filterOption.addEventListener('click', filterTodo );

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
// Add to local storage
saveLocalTodos(todoInput.value);
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
  const item = e.target;
  if (item.classList[0] === "check-btn"){
    const check = item.parentElement;
    check.classList.toggle("completed");
  }
}

function deleteTodo(e){
  const todoItem = e.target;

  if(todoItem.classList[0] === "delete-btn"){
    const todo = todoItem.parentElement;
    todo.classList.add("fall");
    // remove frm storage
    removeLocalTodos(todo);
    todo.addEventListener("transitioned", function(){
      todo.remove();
    })
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function (todo) {
   switch(e.target.value){
     case "all":
       todo.style.display = "flex";
       break;
       case "completed":
         if(todo.classList.contains("completed")){
           todo.style.display = "flex";
         }else {
           todo.style.display ="none";
         }
         break;
         case "uncompleted":
           if(!todo.classList.contains("completed")){
             todo.style.display = "flex";
           }else {
            todo.style.display ="none";
          }
          break;
   } 
  });
}

function saveLocalTodos(todo){
  // check..if todos are in local storage
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  // console.log('hello');
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
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
  });
}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}