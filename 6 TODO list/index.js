const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

const addTodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText <= 0){
        alert("please enter something");
    }
    else{
        if(addBtn.value == 'Edit'){
            editTodo.target.previousElementSibling.innerText = inputText;
            editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
            addBtn.value = 'Add';
            inputBox.value = "";

        }else{
        
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML=inputText;
        li.appendChild(p);

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add('btn','editBtn');
        li.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove";
        deleteButton.classList.add('btn','deleteBtn');
        li.appendChild(deleteButton);

        todoList.appendChild(li);
        inputBox.value="";
        }
        
        saveLocalTodos(inputText);
    }
}

const updateTodo = (e)=>{
    //console.log(e.target);
    //console.log(e.target.innerHTML);
    
    if(e.target.innerHTML === 'Remove'){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if(e.target.innerHTML === 'Edit'){
        inputBox.value = e.target.previousElementSibling.innerText;
        inputBox.focus();
        addBtn.value = 'Edit';
        editTodo = e;
    }
}

const saveLocalTodos = (todo)=>{
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        // console.log(JSON.parse(localStorage.getItem("todos")))
        // console.log(typeof(JSON.parse(localStorage.getItem("todos"))))
    }
    todos.push(todo);
    // console.log(todos);
    // console.log(typeof(todos));
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(JSON.stringify(todos));
    // console.log(typeof(JSON.stringify(todos)));
}

const getLocalTodos = ()=>{
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(element => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML=element;
            li.appendChild(p);

            const editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.classList.add('btn','editBtn');
            li.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Remove";
            deleteButton.classList.add('btn','deleteBtn');
            li.appendChild(deleteButton);

            todoList.appendChild(li);
        });
    }
}

const deleteLocalTodos = (todo)=>{
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const editLocalTodos = (todo)=>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    localStorage.clear();
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded',getLocalTodos);//------imp--------
addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo);//------imp--------