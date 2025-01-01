document.addEventListener("DOMContentLoaded", () => {
  console.log("New task page DOM is now fully loaded and parsed");
  const taskForm = document.getElementById("new-task-form");

  const newTaskButton = document.getElementById("new-task-btn");
  const myTaskButton = document.getElementById("my-task-btn");
  const activeNewTaskButtonId = localStorage.getItem("activeNewTaskButton");

  console.log("Retrieved from localStorage:", activeNewTaskButtonId);

  // Checker if New Task Button is set active
  if (activeNewTaskButtonId) {
    const activeNewTaskButton = document.getElementById(activeNewTaskButtonId);
    if (activeNewTaskButton) {
      console.log("I have set the active state in the new page.");
      activeNewTaskButton.classList.add("active");
      console.log("Button classes:", activeNewTaskButton.classList);
    } else {
      console.log("There is no active new task button");
    }
  }

  myTaskButton.addEventListener("click", () => {
    console.log("Now moving to My Tasks page.");
    window.location.href = "todowebapp.html";
  });
});
