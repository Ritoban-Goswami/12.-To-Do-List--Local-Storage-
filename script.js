let input = document.getElementById('input');
let addBtn = document.getElementById('addBtn');
let clrBtn = document.getElementById('clrBtn');
let list = document.getElementById('list');
let tasksArr = [];

const loadTasks = () => {
    if (localStorage.getItem('tasks') === null) {
        list.innerHTML = '';
    }
    else {
        tasksArr = JSON.parse(localStorage.getItem('tasks'))
        tasksArr.forEach(storageElem => {
            list.innerHTML += `<li class="list-group-item py-3 tasks d-flex justify-content-between align-items-center">
            ${storageElem}<i class="fa-solid fa-xmark close" onclick ="clrEach(event)"></i>
    </li>`
        })
    }
}

window.onload = loadTasks

const addTask = () => {
    let inputValue = input.value;
    if (inputValue === '') {
        alert('You gotta type something')
    }
    else {
        tasksArr.push(inputValue);
        localStorage.setItem('tasks', JSON.stringify(tasksArr))
        list.innerHTML += `<li class="list-group-item py-3 tasks d-flex justify-content-between align-items-center">
        ${inputValue}<i class="fa-solid fa-xmark close" onclick ="clrEach(event)"></i>
    </li>`
        input.value = ''
    }
}

clrEach = (event) => {
    clickedElem = event.target.parentNode.innerText
    tasksArr = tasksArr.filter(t => t !== clickedElem)
    localStorage.setItem('tasks', JSON.stringify(tasksArr))
    event.target.parentNode.remove();
}

const clearAll = () => {
    localStorage.removeItem('tasks')
    tasksArr = []
    list.innerHTML = ''
}

addBtn.addEventListener('click', addTask);
clrBtn.addEventListener('click', clearAll);
input.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        addTask()
    }
})
