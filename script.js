let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <div>
                <strong>${task.name}</strong><br>
                <small>
                    Subject: ${task.subject} |
                    Priority: ${task.priority} |
                    Deadline: ${task.deadline || "Not set"}
                </small>
            </div>

            <div>
                <button onclick="completeTask(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });

    updateProgress();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const subject = document.getElementById("subject");
    const priority = document.getElementById("priority");
    const deadline = document.getElementById("deadline");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        name: taskInput.value,
        subject: subject.value,
        priority: priority.value,
        deadline: deadline.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    deadline.value = "";
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    let percentage = 0;

    if (totalTasks > 0) {
        percentage = Math.round(
            (completedTasks / totalTasks) * 100
        );
    }

    document.getElementById("progressText").textContent =
        `${percentage}% Completed`;

    document.getElementById("progressBar").style.width =
        `${percentage}%`;
}

displayTasks();