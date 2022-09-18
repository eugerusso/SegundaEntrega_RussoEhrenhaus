//La idea es hacer como una app de organizción medio inspirada en Notion 

let hoy = new Date();
console.log(hoy);
let usuario = prompt(`Ingrese su nombre`); 
let nuevaTarea;
const listaDeTareas=[];
let cuantasTareas = parseInt(prompt(`¿Cuántas tareas vas a realizar hoy?(Ingresa un número)`))

// const saludar = () =>{ alert(`Bienvenido/a ${usuario} listo/a para organizar tu día?`)}

function ingresarTarea(){
    nuevaTarea= new Tarea(prompt(`Ingrese la tarea que tenes que realizar `),prompt(`Ingrese una breve descripcion`));    
    return nuevaTarea
}

class Tarea{
    constructor(titulo,descripcion){
        this.titulo=titulo;
        this.descripcion=descripcion;
    }
}

// saludar();

for (let i=0; i<cuantasTareas;i++){
    listaDeTareas.push(ingresarTarea());
}

listaDeTareas.forEach (el => console.log(el));

//creando un template string para el saludo
let saludo = document.getElementById("saludo");
saludo.innerText= `Bienvenido ${usuario}`;


//crear una lista a traves del array creado

/* let ul = document.querySelector("ul");
let li = documente.createElement("li");

for (const task of listaDeTareas){
    li.innerHTML= task;
    li.appendChild(listaDeTareas);
}
 */

let task = document.getElementById("tasks");

for(const lista of listaDeTareas){
    let li = document.createElement("li");
    li.innerHTML= `Tarea: ${lista.titulo} <br><br> Descripción: ${lista.descripcion} <br><br> `;
    task.appendChild(li);
}

let probandoArray =["tarea1","tarea2","tarea3"]

for(const prueba of probandoArray){
    let punto=  document.createElement("li");
    punto.innerHTML = prueba;
    task.append(punto);

}

//llamo al id de agregar tarea

const $addTask = document.getElementById("addTask");

$addTask.addEventListener("click",()=>{
    let input= document.createElement("input");
    input.innerHTML = `
    <input type="text">
    <br>`
    document.body.appendChild(input);
})


let formulario = document.querySelector("#login");

function login(event){
    event.preventDefault();
    console.log(event);

    console.dir(formulario);

    let valueUsername = formulario.username.value;
    let valuePassword = formulario.password.value;
    console.log(valueUsername);
    console.log(valuePassword);

    const token = generateToken(valueUsername,valuePassword);
    localStorage.setItem("token",token);

    const validated = existToken();
    if(validated){
        const divPrivateContent = document.querySelector("#privateContent");
        divPrivateContent.className="showContent";
        formulario.className = "hideContent";
    }
}

function generateToken(username,password){
    return username + password;
}

function existToken(){
    if(localStorage.getItem("token") !==null){
        return true;
    }else{
        return false;
    }
}

//Select elements
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListEl = document.getElementById("todos-list");

//vars
let todos =[]; 
let EditTodoId= -1;

//Form submit
form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("submit")

    saveTodo();
    renderTodos();
})

//SAVE TO DO 

function saveTodo(){
    const todoValue = todoInput.value;

    //check if the todo is empty
    const isEmpty= todoValue === '';

    //check for duplicate
    const isDuplicate = todos.some((todo)=> todo.value.toUpperCase() == todoValue.toUpperCase());
    if(isEmpty){
        alert ('che, está vacio');
    }else if(isDuplicate){
        alert ('está repetido')
    }else{
        if(EditTodoId >= 0){
            todos = todos.map((todo,index) =>({
                ...todo,
                value: index=== EditTodoId ? todoValue : todo.value,                
            }));
            EditTodoId = -1;
        }else{
            todos.push({
                value: todoValue,
                checked: false,
                color: '#' + Math.floor(Math.random()*16777215).toString(16),
            });
        }
        
        todoInput.value= ""
    }
    
}

//RENDER TO DO 

function renderTodos(){
    //CLEAR ELEMENT BEFORE RENDER
    todosListEl.innerHTML= "";

    //RENDER TODOS
    todos.forEach((todo,index) =>{
        todosListEl.innerHTML += `
        <div class="todo" id=${index}>
                <i class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}""
                style = "color : ${todo.color}"
                data-action="check"
                ></i>
                <p class="" data-action="check">${todo.value}</p>
                <i class="bi bi-pencil-square" data-action="edit"></i>
                <i class="bi bi-trash" data-action="delete"></i>
            </div>`
    })
}

//CLICK EVENT LISTENER FOR ALL THE TODOS

todosListEl.addEventListener("click", (event) => {
    const target = event.target;
    const parentElement = target.parentNode;

    if(parentElement.className !== "todo")return;

    //todo id
    const todo= parentElement;
    const todoId= Number(todo.id);

    //target action
    const action= target.dataset.action;

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId); 

})

//CHECK A TO DO 

function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked,
    }));

    renderTodos();
}

//EDIT A TO DO

function editTodo(todoId){
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
}

//DELETE A TO DO 

function deleteTodo(todoId){
    todos = todos.filter( (todo,index) => index !== todoId);
    EditTodoId = -1;

    //re-render
    renderTodos();
}