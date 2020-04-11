// render function
const render = (parameter1, parameter2) => {
    parameter2.innerHTML='';
    const doneFilter = document.querySelector('#doneBtn');
    const openFilter = document.querySelector('#openBtn');
    const itemsLeft = document.querySelector('.itemsleft__left');
    
    let openTasks = 0;
    for (let i = 0; i < parameter1.length; i++) {
        if (parameter1[i].status == 'open') {
            openTasks += 1;
        }
        if (doneFilter.checked == true && parameter1[i].status == 'open') {
            continue;
        } else if (openFilter.checked == true && parameter1[i].status == 'done') {
            continue;
        }
        const newElement = document.createElement('li');
        newElement.classList.add('list__listitem');
        newElement.id = i;
        newElement.innerHTML = `<label class="list__checkbox">
            <input type="checkbox">
            <div class="list__hack"></div>
        </label>
        <p class="list__product">${parameter1[i].inhalt}</p>
        <label class="list__btn">
            <input class="list__btn__delete"type="button">
            <div class="cross"></div>
        </label>`;
        if (parameter1[i].status == 'done') {
            newElement.firstChild.firstElementChild.checked = true;
        }
        parameter2.appendChild(newElement);
    }
    itemsLeft.innerText = openTasks + ' items left';
    console.log(openTasks);
    saveToLocalStorage(parameter1);
      
};

// saveToLocalStorage function
function saveToLocalStorage(ToDoList) {             // ToDoList is our array
    const stringTasklist = JSON.stringify(ToDoList);
    localStorage.setItem('ToDos', stringTasklist);
}
const delegate = function (cssClass, callback) {
    return function(event) {
        if (event.target.matches(cssClass)) {
            callback(event);
        };
    };
}


// we export the functions
export { saveToLocalStorage, render, delegate  };