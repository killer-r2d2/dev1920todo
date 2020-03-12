// function creatElement
const createElement = function newTask(newEntry, taskList) {
        const newElement = document.createElement('li');
        newElement.classList.add('list__listitem');
        newElement.innerHTML = `<label class="list__checkbox">
            <input type="checkbox">
            <div class="list__hack"></div>
        </label>
        <p class="list__product">${newEntry}</p>
        <label class="list__btn">
            <input type="button">
            <div class="cross"></div>
        </label>`;
        taskList.appendChild(newElement);
}

// We creat the function deleteTask
const deleteElement = function deleteTask(event) {
    if (event.target.type === 'button') {
        event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
        creatArrayTask()
    }
}

// we export the functions
export { createElement, deleteElement };