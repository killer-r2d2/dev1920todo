// render function
const render = (parameter1, parameter2) => {
    parameter2.innerHTML='';
    for (let i = 0; i < parameter1.length; i++) {
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