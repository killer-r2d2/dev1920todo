// function creatElement
const createElement = (newEntry, taskList) => {
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
};


// We creat the function deleteElement66
 const deleteElement = (event) => {
  if (event.target.type === 'button') {
  event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
  }
 };



// we export the functions
export { createElement, deleteElement };