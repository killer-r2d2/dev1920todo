
// We import all functions from tools.js
import * as Tools from './tools.js';

// JavaScript knows now your ul with the class .list
const taskList = document.querySelector('.list');
// we admit an eventlistener with a 'click' event and the deleteTask function
taskList.addEventListener('click', Tools.deleteElement);

// creat an elment with data from localStorage
const ToDoList = JSON.parse(localStorage.getItem('ToDos'));
    for (let i = 0; i < ToDoList.length; i++) {
    Tools.createElement(ToDoList[i].inhalt, taskList);
    }

// JavaScript knows now your div with the class placeholder and the input tag
const newEntry = document.querySelector('.placeholder input');
// we admit an eventlistener with a 'keypress' event and the newTask function
newEntry.addEventListener('keypress', function(event){
        if (event.key === 'Enter') {
        Tools.createElement(newEntry.value, taskList);
        newEntry.value = '';
        creatArrayTask();
        }
    }
);

// we creat the creatArrayTask function
function creatArrayTask() {
    const arrayTask = [];
    let listLoop = document.querySelectorAll('.list__listitem');
    for (let i = 0; i < listLoop.length; i++) {
        let status = 'open';
        let inhalt = listLoop[i].lastElementChild.previousElementSibling.innerHTML;
        let taskObject = {status:status, inhalt:inhalt};
        arrayTask.push(taskObject);
    }
    const listJson = JSON.stringify(arrayTask);
    localStorage.setItem('ToDos', listJson);
}

