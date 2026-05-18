// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// -------------------- SHOW TASKS --------------------
function showTasks() {
  const container = document.getElementById("tasks");

  container.innerHTML = "";

  // 🟢 If no tasks
  if (tasks.length === 0) {
    container.innerHTML = "No tasks yet 📭";
    return;
  }

  // Show all tasks
  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <p class="${task.done ? 'completed' : ''}">
        ${task.text}
      </p>

      <p style="font-size:12px; color:gray;">Task created</p>

      <button onclick="toggleTask(${index})">✔ Done</button>
      <button onclick="deleteTask(${index})">❌ Delete</button>
    `;

    container.appendChild(div);
  });
}

// -------------------- ADD TASK --------------------
function addTask() {
  const input = document.getElementById("taskInput");

  // Prevent empty task
  if (input.value.trim() === "") {
    alert("Task cannot be empty");
    return;
  }

  const newTask = {
    text: input.value,
    done: false
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  showTasks();
}

// -------------------- TOGGLE TASK --------------------
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

// -------------------- DELETE TASK --------------------
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}

// -------------------- INITIAL LOAD --------------------
showTasks();