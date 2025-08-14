// Selecting elements for modal
const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll(".add-btn");
const overlay = document.querySelector(".overlay");
const closeModel = document.querySelector(".close-model");

const todoItem = document.querySelector(".todo-item");
const todoItem2 = document.querySelector(".todo-item2");
const todoItem3 = document.querySelector(".todo-item3")
let currentSection = ""; // todo or inprogress or done

// Open modal
openModal.forEach(button => {
  button.addEventListener("click", function () {
    currentSection = button.dataset.section; // get the section: todo or inprogress or done
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

  const tasks3 = JSON.parse(localStorage.getItem("tasks3")) || [];
  tasks3.forEach(task3 =>displayTaskDone(task3))
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
  }else if(currentSection === 'done'){
    const tasks3 = JSON.parse(localStorage.getItem("tasks3")) || [];
    tasks3.push(task);
    localStorage.setItem("tasks3", JSON.stringify(tasks3))
    displayTaskDone(task)
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

  //* Edit btn
  
  const editBtn = div.querySelector(".edit-btn");
  editBtn.addEventListener("click", function(){
    openEditModal(task);
  })
}

//* openEditModal ayaan hlakan ku sameysan
function openEditModal(task){
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");

  //* fill the form fields with task data
  document.querySelector("#input-text").value = task.title;
  document.querySelector("#textArea").value = task.description;
  document.querySelector("#date").value = task.dueDate;
  document.querySelector("#priority").value = task.priority;
  document.querySelector("#status").value = task.status;
 
  // handle the save button to update the task
  const saveBtn = document.querySelector(".create-btn");
  saveBtn.textContent = "Save Changes";

  // event listener for save  changes button
  saveBtn.removeEventListener("click", updateTask)//remove previous handle
  saveBtn.addEventListener("click", function(){
    updateTask(task);
  })


} 
//todo function updateTask ayaan halka ku sameyn
// function updateTask(task){
//   const title = document.querySelector("#input-text").value;
//   const description = document.querySelector("#textArea").value;
//   const dueDate = document.querySelector("#date").value;
//   const priority = document.querySelector("#priority").value;
//   const status = document.querySelector("#status").value;

//   const updateTask = {
//     id: task.id,
//     title: title,
//     description: description,
//     dueDate: dueDate,
//     priority: priority,
//     status: status,
//   }

//   //* save updated task to localstorage
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
//   tasks =tasks.map(t => t.id === task.id ? updateTask : t);
//   localStorage.setItem("tasks", JSON.stringify(tasks));

//    document.querySelector(".todo-item").innerHTML = ''; // Clear the task list
//   tasks.forEach(task => displayTask(task)); // Re-render tasks
//   // Close modal
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// } 

//* ///////////////////////////////////////////////////////////
//todo ///////////////////////////////////////////////////////
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

  const editBtn = div.querySelector(".edit-btn");
  editBtn.addEventListener("click", function(){
    openEditModal(task);
  })
}

//* halkana waxaa ka bilaabmaya updateTask weliba qeybta progress-ka 
// function updateTask(task){
//   const title = document.querySelector("#input-text").value;
//   const description = document.querySelector("#textArea").value;
//   const dueDate = document.querySelector("#date").value;
//   const priority = document.querySelector("#priority").value;
//   const status = document.querySelector("#status").value;

//   const updateTask = {
//     id: task.id,
//     title: title,
//     description: description,
//     dueDate: dueDate,
//     priority: priority,
//     status: status,
//   }

//   //* save updated task to localstorage
//   let tasks2 = JSON.parse(localStorage.getItem("tasks2")) || []; 
//   tasks2 =tasks2.map(t => t.id === task.id ? updateTask : t);
//   localStorage.setItem("tasks2", JSON.stringify(tasks2));

//    document.querySelector(".todo-item2").innerHTML = ''; // Clear the task list
//   tasks2.forEach(task => displayTaskInprogress(task)); // Re-render tasks
//   // Close modal
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// } 
//*/*/*/*/*////////////////////////////////////////////
//todo halkan waxaa ka bilaabmaya shaqada sectionka (done) 
function displayTaskDone(task){
    const div = document.createElement("div")
    div.className = "todo-list3";

    div.innerHTML = `
     <h2 class="text">${task.title}</h2>
    <p class="content">${task.description}</p>
    <h3 class="level">${task.dueDate}</h3>
    <p class="date">${task.priority}</p>
    <p class="date">${task.status}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    `
    todoItem3.appendChild(div);
    //* Delete function
    const deleteBtn3 = div.querySelector(".delete-btn");
    deleteBtn3.addEventListener("click", function(){
        div.remove()
        let tasks3 = JSON.parse(localStorage.getItem("tasks3")) ||[];
        tasks3 = tasks3.filter(t => t.id !== task.id);
        localStorage.setItem("tasks3", JSON.stringify(tasks3))
    }) 

    //* Edit btn
    const editBtn = div.querySelector(".edit-btn") ;
    editBtn.addEventListener("click", function(){
      openEditModal(task)
    })
    
}

function updateTask(task){
  const title = document.querySelector("#input-text").value;
  const description = document.querySelector("#textArea").value;
  const dueDate = document.querySelector("#date").value;
  const priority = document.querySelector("#priority").value;
  const status = document.querySelector("#status").value;

  const updateTask = {
    id: task.id,
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    status: status,
  }

  //* save updated task to localstorage
    // Update task based on status (to-do, in-progress, done)
  if (updateTask.status === "To Do") {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t => t.id === task.id ? updateTask : t); // Replace the task
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.querySelector(".todo-item").innerHTML = ''; // Clear the task list
    tasks.forEach(task => displayTask(task)); // Re-render tasks
  } else if (updateTask.status === "In-Progress") {
    let tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
    tasks2 = tasks2.map(t => t.id === task.id ? updateTask : t); // Replace the task
    localStorage.setItem("tasks2", JSON.stringify(tasks2));
    document.querySelector(".todo-item2").innerHTML = ''; // Clear the task list
    tasks2.forEach(task => displayTaskInprogress(task)); // Re-render tasks
  } else if (updateTask.status === "Done") {
    let tasks3 = JSON.parse(localStorage.getItem("tasks3")) || [];
    tasks3 = tasks3.map(t => t.id === task.id ? updateTask : t); // Replace the task
    localStorage.setItem("tasks3", JSON.stringify(tasks3));
    document.querySelector(".todo-item3").innerHTML = ''; // Clear the task list
    tasks3.forEach(task => displayTaskDone(task)); // Re-render tasks
  }

  // Close modal
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
} 