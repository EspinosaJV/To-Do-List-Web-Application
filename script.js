document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskTableBody = document
    .getElementById("task-table")
    .getElementsByTagName(`tbody`)[0];
  const taskTableHead = document
    .getElementById(`task-table`)
    .getElementsByTagName(`thead`)[0];
  let taskId = 1;
  let deleteHeaderAdded = false;

  // Function that adds the "DELETE" column header
  function addDeleteColumnHeader() {
    const headerRow = taskTableHead.rows[0];
    // Condition checks if there is existing delete header
    if (!headerRow.querySelector(".delete-header")) {
      const deleteHeader = document.createElement("th");
      deleteHeader.textContent = "Delete";
      deleteHeader.classList.add("delete-header");
      headerRow.appendChild(deleteHeader);
    }
  }

  // Function that removes the "DELETE" column header
  function removeDeleteColumnHeader() {
    const headerRow = taskTableHead.rows[0];
    const deleteHeader = headerRow.querySelector(".delete-header");
    if (deleteHeader) {
      headerRow.removeChild(deleteHeader);
    }
  }

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Checks if first tasks, adding "DELETE" column header if so
    if (taskTableBody.rows.length === 0) {
      addDeleteColumnHeader();
    }

    // Get values from the form
    const taskName = document.getElementById(`task-name`).value;
    const taskDeadline = document.getElementById(`task-deadline`).value;
    const taskComment = document.getElementById(`task-comment`).value;
    const taskInputDate = new Date().toLocaleDateString();

    // Create a new row for the task
    const newRow = taskTableBody.insertRow();

    newRow.innerHTML = `
        <td>${taskId}</td>
        <td>${taskName}</td>
        <td>${taskInputDate}</td>
        <td>${taskDeadline}</td>
        <td>${taskComment}</td>
        <td><input type="checkbox" class="task-checkbox"></td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    //Increments taskID for next task input
    taskId++;

    // Task completion checkbox event listener
    const checkbox = newRow.querySelector(`.task-checkbox`);
    checkbox.addEventListener(`change`, function () {
      if (checkbox.checked) {
        newRow.style.textDecoration = `line-through`; // strikes through the newly completed task
        newRow.style.color = `gray`; // grays out the text after completion
      } else {
        newRow.style.textDecoration = `none`; // removes text decoration
        newRow.style.color = `black`; // sets color to black
      }
    });

    // Delete Button Event Listener
    const deleteButton = newRow.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      taskTableBody.removeChild(newRow); // Removes row upon clicking the delete button

      // If no tasks left, we remove the delete column header
      if (taskTableBody.rows.length === 0) {
        removeDeleteColumnHeader();
      }
    });

    // Clears the input fields
    taskForm.reset();
  });
});
