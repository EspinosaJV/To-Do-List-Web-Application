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
    `;

    //Increments taskID for next task input
    taskId++;

    // Clears the input fields
    taskForm.reset();
  });
});
