document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskTableBody = document
    .getElementById("task-table")
    .getElementsByTagName(`tbody`)[0];
  let taskId = 1;

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

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
    // Clears the input fields
    taskForm.reset();
  });
});
