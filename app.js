// We import all functions from tools.js
import * as Tools from './tools.js';

// JavaScript knows now your ul with the class .list
const taskList = document.querySelector('.list');
// we admit an eventlistener with a 'click' event and the deleteTask function
taskList.addEventListener('click', deleteElement);

// creat an elment with data from localStorage
let ToDoList = JSON.parse(localStorage.getItem('ToDos')); // ToDos is the key of our localStorage
if (ToDoList) {
    Tools.render(ToDoList, taskList);
} else {
    ToDoList = [];
};

// JavaScript knows now your div with the class placeholder and the input tag
const newEntry = document.querySelector('.placeholder input');
// we admit an eventlistener with a 'keypress' event and the creatElement function
newEntry.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            // Tools.render(newEntry.value, taskList);
            ToDoList.push({status:'open', inhalt: newEntry.value});
            newEntry.value = '';
            Tools.render(ToDoList, taskList);
        }
    }
);


// We creat the function deleteElement
function deleteElement(event) {
    if (event.target.matches('.list__btn__delete')) {
        ToDoList.splice(event.target.parentNode.parentNode.id, 1);
        Tools.render(ToDoList, taskList);
    }
   
};
// We create the filter function
// function filterTasks() {
//     ToDoList.filter(function(offen) {
//         return offen.status == 'open';
//     })
// }
var todos = [];

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
        todos= antwort;
        render();
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
        body: JSON.stringify(todos),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    render();
};