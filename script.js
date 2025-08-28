// Load tasks from localStorage on page load
window.onload = function() {
  loadTasks();
  updateTaskCount();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText);
  saveTask(taskText);
  input.value = "";
  updateTaskCount();
}

function createTaskElement(taskText, done = false) {
  const li = document.createElement("li");
  li.textContent = taskText;
  if (done) li.classList.add("done");

  // Mark task as done when clicked
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    updateLocalStorage();
  });

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");
  editBtn.onclick = () => {
    const newTask = prompt("Edit your task:", li.firstChild.textContent);
    if (newTask) {
      li.firstChild.textContent = newTask;
      updateLocalStorage();
    }
  };

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("delete");
  delBtn.onclick = () => {
    li.remove();
    updateLocalStorage();
    updateTaskCount();
  };

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.done));
}

function updateLocalStorage() {
  const items = document.querySelectorAll("#taskList li");
  let tasks = [];
  items.forEach(li => {
    tasks.push({ text: li.firstChild.textContent, done: li.classList.contains("done") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAll() {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks");
  updateTaskCount();
}

function updateTaskCount() {
  const count = document.querySelectorAll("#taskList li").length;
  document.getElementById("taskCount").textContent = "Total Tasks: " + count;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
