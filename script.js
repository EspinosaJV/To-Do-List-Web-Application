document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskTableBody = document
    .getElementById("task-table")
    .getElementsByTagName("tbody")[0];
  const taskTableHead = document
    .getElementById("task-table")
    .getElementsByTagName("thead")[0];
  const taskFilter = document.getElementById("task-filter");

  let taskId = 1;
  let deleteHeaderAdded = false;
  const tasks = []; // Store tasks in this array

  // Function that adds the DELETE column header
  function addDeleteColumnHeader() {
    if (!deleteHeaderAdded) {
      const headerRow = taskTableHead.rows[0];
      const deleteHeader = document.createElement("th");
      deleteHeader.textContent = "Delete";
      deleteHeader.classList.add("delete-header");
      headerRow.appendChild(deleteHeader);
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
    taskTableBody.innerHTML = "";

    // This filters the tasks based on chosen filter
    const filteredTasks = tasks.filter((task) => {
      if (taskFilter.value === "completed") {
        return task.completed;
      } else if (taskFilter.value === "pending") {
        return !task.completed;
      }
      return true; // displays both completed & pending tasks
    });

    // Displays the filtered tasks
    filteredTasks.forEach((task) => {
      const newRow = taskTableBody.insertRow();

      newRow.innerHTML = `
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td>${task.dateAdded}</td>
        <td>${task.deadline}</td>
        <td>${task.comment}</td>
        <td><input type="checkbox" class="task-checkbox" ${
          task.completed ? "checked" : ""
        }></td>
        <td><button class="delete-btn">Delete</button></td>
      `;

      // Application of the completed styling if task is marked complete
      if (task.completed) {
        newRow.style.textDecoration = `line-through`;
        newRow.style.color = `gray`;
      }

      // Task completion checkbox event listener
      const checkbox = newRow.querySelector(`.task-checkbox`);
      checkbox.addEventListener(`change`, function () {
        task.completed = checkbox.checked;
        displayTasks();
      });

      // Delete button event listener
      const deleteButton = newRow.querySelector(`.delete-btn`);
      deleteButton.addEventListener(`click`, function () {
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index > -1) {
          tasks.splice(index, 1);
        }

        if (tasks.length === 0) {
          removeDeleteColumnHeader();
        }

        displayTasks();
      });
    });

    // Shows or hides the delete header based on the number of tasks currently
    if (tasks.length > 0) {
      addDeleteColumnHeader();
    } else {
      removeDeleteColumnHeader();
    }
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
    displayTasks();

    // Handles the clearing of input fields after submitting
    taskForm.reset();
  });

  // Event Listener for task filter
  taskFilter.addEventListener("change", displayTasks);

  // Initial Display call
  displayTasks();
});
