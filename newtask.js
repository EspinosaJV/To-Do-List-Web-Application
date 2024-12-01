document.addEventListener("D0MContentLoaded", () => {
  const taskForm = document.getElementById("new-task-form");

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDeadline = document.getElementById("task-deadline").value;
    const taskComment = document.getElementById("task-comment").value;
  
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
        name: taskName,
        deadline: taskDeadline;
        comment: taskComment,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("Task added successfully!");
    taskForm.reset();
    });
});
