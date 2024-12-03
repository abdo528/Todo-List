// GLOBAL
var inputTask = document.getElementById('inputNameTask');
var selectStatus = document.getElementById('selectStatusTask');
var add = document.getElementById('addTask');
var update = document.getElementById('updateTask')
var search = document.getElementById('searchTask');
var tasks;

// LOCALSTORAGE
if (JSON.parse(localStorage.getItem("taskat")) !== null) {
    tasks = JSON.parse(localStorage.getItem("taskat"))
    showTasks(tasks)
}
else {
    tasks = []
}

// ADD
function addTask() {
    var newTask = {
        nameTask: inputTask.value,
        isCompleted: false
    }
    if (valid()) {
        inputTask.classList.remove("is-invalid")
        tasks.push(newTask)
        showTasks(tasks)
        localStorage.setItem("taskat", JSON.stringify(tasks))
        inputTask.value = null
    }else {
        inputTask.classList.add("is-invalid")
        Swal.fire("Minimam 3 char");
    }
}
add.addEventListener('click', addTask)

// SHOW
function showTasks(display) {
    var box = ''
    for (let index = 0; index < display.length; index++) {
        box += `<div class="col-md-12">
                            <div class="d-flex align-items-center p-3 rounded boxsh ${display[index].isCompleted === true ? "bg-success shadow" : ''}">
                                <input ${display[index].isCompleted === true ? "checked" : ''} onchange="taskDone(${index})" type="checkbox" id="TaskChecked${index}" class="d-none checkBox">
                                <label for="TaskChecked${index}" class="labelCheck"></label>
                                <p class="m-0 text-white ${display[index].isCompleted === true ? 'text-decoration-line-through' : ''}">${display[index].nameTask}</p>
                                <button onclick="readyToUpdateTask(${index})" class="btn btn-danger ms-auto ${display[index].isCompleted === true ? "d-none" : ''}"><i class="fa-solid fa-pen-nib"></i> Update</button>
                                <button onclick="deletTask(${index})" class="btn btn-warning mx-3 ${display[index].isCompleted === true ? "ms-auto" : ''}"><i class="fa-solid fa-trash-can"></i> Delete</button>
                            </div>
        </div>`
    }
    document.getElementById('bodyTasks').innerHTML = box
}

// DELET
function deletTask(index) {
    tasks.splice(index, 1)
    showTasks(tasks)
    localStorage.setItem("taskat", JSON.stringify(tasks))
}

// UPDATE
var currentIndex;
function readyToUpdateTask(index) {
    document.getElementById(`bodyTasks`).classList.add('z-n1','position-relative')
    inputTask.value = tasks[index].nameTask
    add.classList.add("d-none")
    update.classList.remove("d-none")
    currentIndex = index
}
function updateTask() {
    if (valid()) {
        document.getElementById(`bodyTasks`).classList.remove('z-n1','position-relative')
        tasks[currentIndex].nameTask = inputTask.value
        showTasks(tasks)
        localStorage.setItem("taskat", JSON.stringify(tasks))
        add.classList.remove("d-none")
        update.classList.add("d-none")
        inputTask.value = null
    }else {
        Swal.fire("Minimam 3 char");
        inputTask.classList.add("is-invalid")
    }
}
update.addEventListener('click', updateTask)

// SEARCH
function searchTask() {
    var searchValue = search.value.toLowerCase()
    var arr = []
    for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].nameTask.toLowerCase().includes(searchValue)) {
            arr.push(tasks[index])
        }
    }
    showTasks(arr)
}
search.addEventListener('input', searchTask)

// FILTER 
function filterTasks() {
    var arrsts = []
    for (let index = 0; index < tasks.length; index++) {
        if (selectStatus.value === "All") {
            arrsts.push(tasks[index])
        } else if (selectStatus.value === "pending" && tasks[index].isCompleted === false) {
            arrsts.push(tasks[index])
        } else if (selectStatus.value === "Complete" && tasks[index].isCompleted === true) {
            arrsts.push(tasks[index])
        }
    }
    showTasks(arrsts)
}
selectStatus.addEventListener('change', filterTasks)

// CHECKED
function taskDone(index) {
    tasks[index].isCompleted = !tasks[index].isCompleted
    localStorage.setItem("taskat", JSON.stringify(tasks))
    showTasks(tasks)
}

// VALLidaTION
function valid(){
    var regex = /^[a-zA-Z0-9 ]{3,}$/
    return regex.test(inputTask.value)
}