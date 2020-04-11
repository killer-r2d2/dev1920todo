// We import all functions from tools.js
import * as Tools from './tools.js';
let ToDoList = [];
// JavaScript knows now your ul with the class .list
const taskList = document.querySelector('.list');
// we admit an eventlistener with a 'click' event and the deleteTask function
taskList.addEventListener('click', deleteElement);
taskList.addEventListener('click', statusChecked);


// JavaScript knows now your div with the class placeholder and the input tag
const newEntry = document.querySelector('.placeholder input');
// we admit an eventlistener with a 'keypress' event and the render function
newEntry.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && newEntry.value != '') {
            // Tools.render(newEntry.value, taskList);
            ToDoList.push({status:'open', inhalt: newEntry.value});
            newEntry.value = '';
            Tools.render(ToDoList, taskList);
            postAufrufStarten();
        }
    }
);

// We creat the function deleteElement
function deleteElement(event) {
    if (event.target.matches('.list__btn__delete')) {
        ToDoList.splice(event.target.parentNode.parentNode.id, 1);
        Tools.render(ToDoList, taskList);
        postAufrufStarten();
    }
};

// We create the function statusChecked
function statusChecked(event) {
    if (event.target.matches('.list__hack')) {
        if (ToDoList[event.target.parentNode.parentNode.id].status == 'open') {
            ToDoList[event.target.parentNode.parentNode.id].status = 'done';
        } else {
            ToDoList[event.target.parentNode.parentNode.id].status = 'open';
        }
        Tools.render(ToDoList, taskList);
    }
}


// We create a function to become the datas directly from the backend server with POST.
// If it's empty it gets the datas from the localStorage.
function getStoredData() {
    if (localStorage.getItem('ToDos')) {
        // ToDos is the key of our localStorage
        ToDoList = JSON.parse(localStorage.getItem('ToDos')); 
        Tools.render(ToDoList, taskList);
        console.log('kommt von localStorage');
    } else if (fetch('http://localhost:3002/todos')) {
        console.log('fetch wird aufgerufen');
        getAufrufStarten();
    }
}

// JavaScript knows now #allBtn/#doneBtn/#openBtn. And we admit click event and the function (postAufrufstarten, getAufrufStarten)
document.querySelector('#allBtn').addEventListener('click', render);  // render function from app.js
document.querySelector('#doneBtn').addEventListener('click', render); // render function from app.js
document.querySelector('#openBtn').addEventListener('click', render); // render function from app.js

/* We import the "render function" from tools.js to convert the function separate in a render
*  function off app.js.
*/
function render() {
    Tools.render(ToDoList, taskList);
}

// we create a fetch (GET) function
function getAufrufStarten() {
    fetch('http://localhost:3002/todos')
    // response contains the answer of the server, like before.
    .then(function(response) {
    // with .json(), is executed in the background JSON.parse 
        return response.json();
    })
    .then(function(antwort) {
        ToDoList = antwort;
        Tools.render(ToDoList, taskList);
    // with todos you can now work quite normally, it is already converted  
    });
};

// we create a fetch (POST) function
function postAufrufStarten() {
    fetch('http://localhost:3002/todos', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(ToDoList),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    Tools.render(ToDoList, taskList);
};

getStoredData();