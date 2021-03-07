//dropdown code

const btnDrop = document.querySelector('.btn-dropdown');
const dropDown = document.querySelector('.dropdown');

btnDrop.addEventListener('click',toggleFunc);
document.addEventListener('DOMContentLoaded', renderTodos)
function toggleFunc(event){
    event.preventDefault();
    if(dropDown.style.display == 'none'){
        dropDown.style.display = 'block';
    }else {
        dropDown.style.display = 'none';
    }
}
//


//end of functionality


//creating tasks

const btnAdd = document.querySelector('.btn-todo');
const ulTodo = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const dropdownLi = document.querySelector('.dropdown-list');
const dropText = document.querySelector('.text');


btnAdd.addEventListener('click', addTodo);
ulTodo.addEventListener('click', deleteItem);
dropdownLi.addEventListener('click', dropDownTarget);


function addTodo(event){
    //prevents form from automatically submitting 
    event.preventDefault();
    if(todoInput.value == ""){
        return false;
    }
    
    saveData(todoInput.value);
    //creating a div element
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.classList.add('incomplete');
    //creating a li element

    const newList = document.createElement('li');
    newList.innerHTML = `${todoInput.value}`;
    newList.classList.add('todo-li');
    todoDiv.appendChild(newList);
    //creating a check button
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    checkBtn.classList.add('btn-check');
    todoDiv.appendChild(checkBtn);
    //creating a delete button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
    trashBtn.classList.add('btn-trash');
    todoDiv.appendChild(trashBtn);

    //append to todolist class
    ulTodo.appendChild(todoDiv);

    todoInput.value = "";
}


//deleting todo list


function deleteItem(e){
     const item = e.target;
     if(item.classList[0] === "btn-trash"){
        deleteLocalTodo(item);
         let itemParent = item.parentElement;
         itemParent.remove();
     }

     //checking completed tasks
     if(item.classList[0] === "btn-check"){
        let outer = item.parentElement;
        outer.classList.add('complete');
        outer.classList.remove('incomplete');
        outer.firstChild.style.textDecoration = 'line-through';
        outer.style.background = 'rgb(152, 167, 111)';
        item.style.opacity = "0.5";
     }
}


//filering function
let todo;
let dataStr;

function dropDownTarget(e){
    let el = e.target;
    let getText = el.innerText;
    dropText.innerText = getText;
    
    //
    todo = document.querySelectorAll('.todo-list .todo');
    if(el.innerText === 'All'){
        todo.forEach(ell => {
                ell.style.display = 'flex';      
        })
    }
    if(el.innerText === 'completed'){
        todo.forEach(el => {
            if(el.classList.contains('complete')){
                 el.style.display = "flex";
             }else{
                 el.style.display = "none";
             }
        })
    }
    if(el.innerText === 'incomplete'){
        todo.forEach(ell => {
            if(ell.classList.contains('incomplete')){
                ell.style.display = 'flex';
            }else{
                ell.style.display = "none";
            }
        })
    }


}

//save to local storage 

function saveData(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem('todos', JSON.stringify(todos));
   
}


function renderTodos(){
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'));
  
    todos.forEach(todo => {
        
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.classList.add('incomplete');
    //creating a li element
    const newList = document.createElement('li');
    newList.innerHTML = `${todo}`;
    newList.classList.add('todo-li');
    todoDiv.appendChild(newList);
    //creating a check button
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    checkBtn.classList.add('btn-check');
    todoDiv.appendChild(checkBtn);
    //creating a delete button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
    trashBtn.classList.add('btn-trash');
    todoDiv.appendChild(trashBtn);

    //append to todolist class
    ulTodo.appendChild(todoDiv);
    })
}

function deleteLocalTodo(todo){
    let todos = JSON.parse(localStorage.getItem('todos'));
   
    let todoIndex = todo.parentElement.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
 
    localStorage.setItem('todos', JSON.stringify(todos));
}

