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

  // Function that displays task based on chosen filter
  function displayTasks() {
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
  document
    .querySelector('button[type="add-task"]')
    .addEventListener("click", function (event) {
      console.log("I am now creating a task!");
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
      window.location.href = "todowebapp.html";

      // Handles the clearing of input fields after submitting
      taskForm.reset();
    });
});
