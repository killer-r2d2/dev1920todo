// JavaScript knows now your ul with the class .list
const taskList = document.querySelector('.list');
// we admit an eventlistener with a 'click' event and the deleteTask function
taskList.addEventListener('click', deleteTask);
// JavaScript knows now your div with the class placeholder and the input tag
const newEintrag = document.querySelector('.placeholder input');
// we admit an eventlistener with a 'keypress' event and the newTask function
newEintrag.addEventListener('keypress', newTask);

// create a new element
function newTask(event) {
    if (event.key === 'Enter') {
        const newElement = document.createElement('li');
        newElement.classList.add('list__listitem');
        newElement.innerHTML = `<label class="list__checkbox">
            <input type="checkbox">
            <div class="list__hack"></div>
        </label>
        <p class="list__product">${newEintrag.value}</p>
        <label class="list__btn">
            <input type="button">
            <div class="cross"></div>
        </label>`;
        taskList.appendChild(newElement);
        newEintrag.value = '';
    }
    console.log(newElement);
}

// delete a element
function deleteTask(event) {
    if (event.target.type === 'button') {
        taskList.removeChild(event.target.parentNode.parentNode);
    }
}