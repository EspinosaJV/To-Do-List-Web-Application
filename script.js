document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskFilter = document.getElementById("task-filter");
  const myTaskButton = document.getElementById("my-task-btn");
  const modal = document.getElementById("confirmModal");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // audio variables
  const checkBoxSound = new Audio("sounds/bubblepop.mp3");

  checkBoxSound.load();

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

    // Add this console.log to debug
    console.log("Filtered tasks:", filteredTasks);

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
                <button class="delete-btn" data-task-id="${
                  task.id
                }">Delete</button>
            </div>
        `;

      const checkbox = taskRow.querySelector(".task-checkbox");
      checkbox.addEventListener("change", function () {
        checkBoxSound.currentTime = 0;
        checkBoxSound.play();
        console.log("Task has changed checkbox state.");
        task.completed = checkbox.checked;
        saveTasks();
        displayTasks();
      });

      taskContainer.appendChild(taskRow);
    });

    // Add this console.log to debug
    console.log("Current tasks in storage:", loadTasks());
  }

  // Deletion Modal Event Listeners
  document.addEventListener("click", (event) => {
    if (
      event.target.matches(".delete-btn") ||
      event.target.closest(".delete-btn")
    ) {
      modal.style.display = "block";
      const taskId = event.target.dataset.taskId;
      modal.dataset.taskToDelete = taskId;
    }
  });

  confirmBtn.addEventListener("click", () => {
    const taskId = parseInt(modal.dataset.taskToDelete);
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index > -1) {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    }
    modal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Closes Deletion Modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Closes Deletion Modal with Escape Key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });

  displayTasks();
});
