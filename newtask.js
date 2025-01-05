document.addEventListener("DOMContentLoaded", () => {
  console.log("New task page DOM is now fully loaded and parsed");

  const taskForm = document.getElementById("new-task-form");
  const newTaskButton = document.getElementById("new-task-btn");
  const myTaskButton = document.getElementById("my-task-btn");
  const activeNewTaskButtonId = localStorage.getItem("activeNewTaskButton");

  let taskId = 1;
  let deleteHeaderAdded = false;
  const tasks = loadTasks();

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

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks saved:", tasks);
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    console.log("Loading tasks from storage:", savedTasks);
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      console.log("Parsed tasks:", parsedTasks);
      taskId = parsedTasks.length
        ? parsedTasks[parsedTasks.length - 1].id + 1
        : 1;
      return parsedTasks;
    }
    return [];
  }

  // Form submission handler
  taskForm.addEventListener("submit", function (event) {
    console.log("I am now creating a task!");
    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDeadline = document.getElementById("task-deadline").value;
    const taskComment = document.getElementById("task-comment").value;
    const taskInputDate = new Date().toLocaleDateString();

    console.log("Current tasks before adding:", tasks);

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
    console.log("Current tasks after adding:", tasks);

    saveTasks();
    console.log("Saved tasks:", localStorage.getItem("tasks"));

    // Clear the form
    this.reset();

    // Redirect to main page
    window.location.href = "todowebapp.html";
  });

  // Clear button handler
  document
    .getElementById("clear-task-btn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      taskForm.reset();
    });
});
