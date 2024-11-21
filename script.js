document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskFilter = document.getElementById("task-filter");
  const myTaskButton = document.getElementById("my-task-btn");

  let taskId = 1;
  let deleteHeaderAdded = false;
  const tasks = loadTasks(); // Loads tasks from local storage

  const currentPage = window.location.pathname;
  if (currentPage.endsWith("todowebapp.html") || currentPage === "/") {
    myTaskButton.classList.add("active");
    myTaskButton.removeAttribute("onclick");
  }

  myTaskButton.addEventListener("click", () => {
    window.location.href = "todowebapp.html";
  });
  // Function that saves tasks to local storage
  function saveTasks() {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
  }

  // Functioon that loads the tasks from the local storage
  function loadTasks() {
    const savedTasks = localStorage.getItem(`tasks`);
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      taskId = parsedTasks.length
        ? parsedTasks[parsedTasks.length - 1].id + 1
        : 1; // Sets taskId based on last task
      return parsedTasks;
    }
    return [];
  }

  // Function that adds the DELETE column header
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
      taskRow.classList.add("task-row");
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
        task.completed = checkbox.ariaChecked;
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

  // Event Listener when task is submitted
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDeadline = document.getElementById("task-deadline").value;
    const taskComment = document.getElementById("task-comment").value;
    const taskInputDate = new Date().toLocaleDateString();

    // Handles the creation of a new task object which is then added to the task array
    const task = {
      id: taskId++,
      name: taskName,
      dateAdded: taskInputDate,
      deadline: taskDeadline,
      comment: taskComment,
      completed: false,
    };

    tasks.push(task);
    saveTasks();
    displayTasks();

    // Handles the clearing of input fields after submitting
    taskForm.reset();
  });

  // Event Listener for task filter
  taskFilter.addEventListener("change", displayTasks);

  // Initial Display call
  displayTasks();
});
