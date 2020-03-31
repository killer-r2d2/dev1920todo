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
// we admit an eventlistener with a 'keypress' event and the creatElement function
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
    console.log('event = ' + event);
    if (event.target.matches('.list__btn__delete')) {
        ToDoList.splice(event.target.parentNode.parentNode.id, 1);
        Tools.render(ToDoList, taskList);
        postAufrufStarten();
    }
};

// We create the function statusChecked
function statusChecked(event) {
    if (event.target.matches('.list__checkbox')) {
        console.log(ToDoList);
        if (ToDoList[event.target.parentNode.id].status == 'open') {
            ToDoList[event.target.parentNode.id].status = 'done';
        } else {
            ToDoList[event.target.parentNode.id].status = 'open';
        }
        Tools.render(ToDoList, taskList);
        postAufrufStarten();
    }
}

// We create the filter function
// function filterTasks() {
//     ToDoList.filter(function(offen) {
//         return offen.status == 'open';
//     })
// }
//
// We create a function to become the datas directly from the backend server with POST.
// If it's empty it gets the datas from the localStorage.

function getStoredData() {
    if (localStorage.getItem('ToDos')) {
        ToDoList = JSON.parse(localStorage.getItem('ToDos')); // ToDos is the key of our localStorage
        Tools.render(ToDoList, taskList);
        console.log('kommt von localStorage');
    } else if (fetch('http://localhost:3002/todos')) {
        console.log('fetch wird aufgerufen');
        getAufrufStarten();
    }
}

// JavaScript knows now #postButton and #getButton. And we admit click event and the function (postAufrufstarten, getAufrufStarten)
document.querySelector('#postButton').addEventListener('click', postAufrufStarten);
document.querySelector('#getButton').addEventListener('click', getAufrufStarten);

// we create a fetch (GET) function
function getAufrufStarten() {
    fetch('http://localhost:3002/todos')
    // response enthält die Antwort des Servers, so wie vorher  
    .then(function(response) {
    // mit .json() wird im hintergrund JSON.parse ausgeführt  
        return response.json();
    })
    .then(function(antwort) {
        ToDoList = antwort;
        Tools.render(ToDoList, taskList);
    // mit todos kann jetzt ganz normal gearbeitet werden, es ist bereits umgewandelt    
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