// We import all functions from tools.js
import * as Tools from './tools.js';

// JavaScript knows now your ul with the class .list
const taskList = document.querySelector('.list');
// we admit an eventlistener with a 'click' event and the deleteTask function
taskList.addEventListener('click', deleteElement);

// creat an elment with data from localStorage
let ToDoList = JSON.parse(localStorage.getItem('ToDos')); // ToDos is the key of localStorage
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


