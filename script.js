document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskFilter = document.getElementById("task-filter");
  const myTaskButton = document.getElementById("my-task-btn");

  let taskId = 1;
  let deleteHeaderAdded = false;
  const tasks = loadTasks();

  const currentPage = window.location.pathname;
  if (currentPage.endsWith("todowebapp.html") || currentPage === "/") {
    myTaskButton.classList.add("active");
    myTaskButton.removeAttribute("onclick");
  }

  const newTaskButton = document.getElementById("new-task-btn");
  newTaskButton.addEventListener("click", () => {
    localStorage.setItem("activeNewTaskButton", "new-task-btn");
    console.log(
      "Active Button Set:",
      localStorage.getItem("activeNewTaskButton")
    );
    window.location.href = "newtask.html";
  });

  myTaskButton.addEventListener("click", () => {
    window.location.href = "todowebapp.html";
  });

  function saveTasks() {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem(`tasks`);
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      taskId = parsedTasks.length
        ? parsedTasks[parsedTasks.length - 1].id + 1
        : 1;
      return parsedTasks;
    }
    return [];
  }

  function addDeleteColumnHeader() {
    if (!deleteHeaderAdded) {
      const headerContainer = document.querySelector(".header-container");
      const deleteHeader = document.createElement("div");
      deleteHeader.textContent = "DELETE";
      deleteHeader.classList.add("header-item");
      headerContainer.appendChild(deleteHeader);
      deleteHeaderAdded = true;
    }
  }

  // Function that removes the DELETE column header
  function removeDeleteColumnHeader() {
    if (deleteHeaderAdded) {
      const headerRow = taskTableHead.rows[0];
      const deleteHeader = headerRow.querySelector(".delete-header");
      if (deleteHeader) {
        headerRow.removeChild(deleteHeader);
        deleteHeaderAdded = false;
      }
    }
  }

  // Function that displays task based on chosen filter
  function displayTasks() {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";

    const filteredTasks = tasks.filter((task) => {
      if (taskFilter.value === "completed") {
        return task.completed;
      } else if (taskFilter.value === "pending") {
        return !task.completed;
      }
      return true;
    });

    filteredTasks.forEach((task) => {
      const taskRow = document.createElement("div");
      taskRow.classList.add("task-row", "new-task-row");
      if (task.completed) {
        taskRow.style.textDecoration = "line-through";
        taskRow.style.color = "gray";
      }

      taskRow.innerHTML = `
        <div>${task.id}</div>
        <div>${task.name}</div>
        <div>${task.dateAdded}</div>
        <div>${task.deadline}</div>
        <div>${task.comment}</div>
        <div>
          <input type="checkbox" class="task-checkbox" ${
            task.completed ? "checked" : ""
          }>
        </div>
        <div>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      const checkbox = taskRow.querySelector(".task-checkbox");
      checkbox.addEventListener("change", function () {
        console.log("Task has changed checkbox state.");
        task.completed = checkbox.checked;
        saveTasks();
        displayTasks();
      });

      const deleteButton = taskRow.querySelector(".delete-btn");
      deleteButton.addEventListener("click", function () {
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index > -1) {
          tasks.splice(index, 1);
          saveTasks();
        }
        displayTasks();
      });
      taskContainer.appendChild(taskRow);
    });
  }

  // Event Listener for task filter
  taskFilter.addEventListener("change", displayTasks);

  // Initial Display call
  displayTasks();
});
