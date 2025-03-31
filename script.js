document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.getElementById("addTaskButton");
    const todoList = document.getElementById("taskList");
    const todoInput = document.getElementById("taskInput");

    let tasks =JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        renderTasks(task);
    });
    addTaskButton.addEventListener("click", function () {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newtask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        tasks.push(newtask);
        saveTasks();
        todoInput.value = "";
        console.log(tasks);
        renderTasks(newtask);
    });

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `<span>${task.text}</span> <button class="deleteTaskButton">Delete</button>`;
        const deleteTaskButton = li.querySelector(".deleteTaskButton");
        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            const taskId = li.getAttribute("data-id");
            tasks.forEach((task) => {
                if (task.id == taskId) {
                    task.completed = !task.completed;
                }
            });
            saveTasks();
        });
        deleteTaskButton.addEventListener("click", function () {
            const taskId = li.getAttribute("data-id");
            tasks = tasks.filter((task) => task.id != taskId);
            saveTasks();
            todoList.removeChild(li);
        });
        todoList.appendChild(li);
    }
});