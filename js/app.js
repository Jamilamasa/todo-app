// Current time
function getCurrtime() {
  const currHour = new Date().getHours();
  const currMinutes = new Date().getMinutes();
  let h;
  let m;
  let currTime;

  h = (currHour < 10 ? "0" : "") + currHour;
  m = (currMinutes < 10 ? "0" : "") + currMinutes;

  currTime = `${h}:${m}`;
  return currTime;
}
//Greeting
function getTimeOfDay() {
  const currHour = new Date().getHours();
  let timeOfDay;
  if (currHour < 12) {
    timeOfDay = "morning";
  } else if (currHour >= 12 && currHour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }
  return timeOfDay;
}

// Main content (time and greeting)
const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const settingsBtn = document.querySelector(".material-symbols-outlined");
const nameForm = document.querySelector('.getName');
const nameInput = document.querySelector('#enterName')

// Time
time.innerHTML = `<h1 class="lead-text">${getCurrtime()}</h1>`;
// Greeting
nameForm.addEventListener('submit', addName);

function addName(e) {
    if (nameInput.value === "") {
        alert('Please Enter Your Name Boss')
    } else {
        greeting.innerHTML = `<h2 class="m-heading">Good ${getTimeOfDay()}, ${nameInput.value}</h2>`;
    }
    nameForm.style.display = "none";

    addNameToLocalStorage(nameInput.value)
    e.preventDefault();
}

function addNameToLocalStorage(name) {
    let userName;
    if (localStorage.getItem('userName') === null){
        userName;
    } else {
        userName = name;
    }
    localStorage.setItem("name", name);
}


// Background
document.addEventListener("DOMContentLoaded", changeBg);
settingsBtn.addEventListener("click", changeBg);

function changeBg() {
  const container = document.querySelector(".container");
  const bgs = [
    "benz",
    "city",
    "dodge",
    "masjid",
    "masjid-2",
    "nature",
    "flower",
    "bike",
    "house",
  ];
  let bgimg = "background-image";
  const rand = Math.floor(Math.random() * bgs.length);
  const bg = bgs[rand];

  container.style.backgroundImage = `url('/${bg}.jpg')`;
  if (localStorage.getItem("name")!== null) {
    nameForm.style.display = "none";
    greeting.innerHTML = `<h2 class="m-heading">Good ${getTimeOfDay()}, ${localStorage.getItem("name")}</h2>`;
  } else if (localStorage.getItem("name") === null) {
    nameForm.style.display = "block";
    greeting.innerHTML = `<h2 class="m-heading">Good ${getTimeOfDay()}, </h2>`;
  }
  
}

// To-do app
const taskInput = document.querySelector("#task-input");
const taskForm = document.querySelector(".taskForm");
const taskList = document.querySelector(".tasks");
const clearBtn = document.querySelector(".clearBtn");
const filter = document.querySelector("#filter");

loadAllEventListeners();

function loadAllEventListeners() {
  // Add task
  taskForm.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTask);
  filter.addEventListener("keyup", search);
  document.addEventListener("DOMContentLoaded", getTask)
}
function getTask() {
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(toDo) {
     // create list
     const li = document.createElement("li");
     li.className = "task-item";
     //    Create checkbox
     const check = document.createElement("input");
     check.setAttribute("type", "checkbox");
     check.id = "complete";
     //    Create delete
     const del = document.createElement("a");
     del.className = "delete";
     del.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
     // Create span
     const span = document.createElement("span");
     span.appendChild(document.createTextNode(toDo));
     //    create textnode and append
     li.appendChild(check);
     li.appendChild(span);
     li.appendChild(del);
     // Append li to ul
     taskList.appendChild(li);
  })
}

// Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please enter a task");
  } else {
    // create list
    const li = document.createElement("li");
    li.className = "task-item";
    //    Create checkbox
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.id = "complete";
    //    Create delete
    const del = document.createElement("a");
    del.className = "delete";
    del.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    // Create span
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(taskInput.value));
    //    create textnode and append
    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(del);
    // Append li to ul
    taskList.appendChild(li);
    // Add to LS
  addTodoToLocalStorage(taskInput.value);

    taskInput.value = "";
  }

  e.preventDefault();
}

function addTodoToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}
// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    if (confirm("Do you want to remove task?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
//   Remove from LS
  removeFromLocalStorage(e.target.parentElement.parentElement)
}
function removeFromLocalStorage(todo) {
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(toDo, index) {
    if (todo.textContent === toDo) {
        todos.splice(index, 1)
    }
  })

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Clear task
function clearTask(e) {
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }

  localStorage.removeItem("todos")
  e.preventDefault();
}
// Filter task
function search(e) {
  const text = e.target.value.toLowerCase();

  const items = document.querySelectorAll(".task-item");
  items.forEach(function (item) {
    const x = item.firstChild.textContent.toLowerCase();
    if (x.indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Show todo-list
const todoShow = document.querySelector(".to-do");
const todoText = document.querySelector("#toDoText");
todoText.addEventListener("click", show);

function show(e) {
  if (todoShow.style.display === "none") {
    todoShow.style.display = "block";
  } else {
    todoShow.style.display = "none";
  }
  e.preventDefault();
}
