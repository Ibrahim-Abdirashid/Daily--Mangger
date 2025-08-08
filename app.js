// Selecting elements for modal
const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll(".add-btn");
const overlay = document.querySelector(".overlay");
const closeModel = document.querySelector(".close-model");

const todoItem = document.querySelector(".todo-item");
const todoItem2 = document.querySelector(".todo-item2");
let currentSection = ""; // todo or inprogress

// Open modal
openModal.forEach(button => {
  button.addEventListener("click", function () {
    currentSection = button.dataset.section; // get the section: todo or inprogress
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});

// Close modal
closeModel.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

// Load tasks from localStorage
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => displayTask(task));

  const tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
  tasks2.forEach(task2 => displayTaskInprogress(task2));
};

// Submit form
const inputForm = document.querySelector("#input-form");
inputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.querySelector("#input-text");
  const description = document.querySelector("#textArea");
  const dueDate = document.querySelector("#date");
  const priority = document.querySelector("#priority");
  const status = document.querySelector("#status");

  if (title.value.trim() === "") {
    alert("Fadlan title-ka oo madhan haka tagin");
    return;
  }

  if (dueDate.value.trim() === "") {
    alert("Fadlan date u samee");
    return;
  }

  const task = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    priority: priority.value,
    status: status.value,
  };

  if (currentSection === "todo") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask(task);
  } else if (currentSection === "inprogress") {
    const tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
    tasks2.push(task);
    localStorage.setItem("tasks2", JSON.stringify(tasks2));
    displayTaskInprogress(task);
  }

  // Clear form and close modal
  title.value = "";
  description.value = "";
  dueDate.value = "";
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

// Display To Do
function displayTask(task) {
  const div = document.createElement("div");
  div.className = "todo-list";
  div.innerHTML = `
    <h2 class="text">${task.title}</h2>
    <p class="content">${task.description}</p>
    <h3 class="level">${task.dueDate}</h3>
    <p class="date">${task.priority}</p>
    <p class="date">${task.status}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;
  todoItem.appendChild(div);

  const deleteBtn = div.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    div.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

// Display In Progress
function displayTaskInprogress(task) {
  const div = document.createElement('div');
  div.className = "todo-list2";

  div.innerHTML = `
    <h2 class="text">${task.title}</h2>
    <p class="content">${task.description}</p>
    <h3 class="level">${task.dueDate}</h3>
    <p class="date">${task.priority}</p>
    <p class="date">${task.status}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  todoItem2.appendChild(div);

  // Delete functionality
  const deleteBtn2 = div.querySelector(".delete-btn");
  deleteBtn2.addEventListener("click", function () {
    div.remove();
    let tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
    tasks2 = tasks2.filter(t => t.id !== task.id);
    localStorage.setItem("tasks2", JSON.stringify(tasks2));
  });
}
