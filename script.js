const taskInput = document.getElementById("taskInput");
        const taskList = document.getElementById("taskList");

        // Load tasks from localStorage
        window.onload = function () {
            const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            savedTasks.forEach(task => createTaskElement(task.text, task.completed));
        };

        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task!");
                return;
            }
            createTaskElement(taskText, false);
            saveTasks();
            taskInput.value = "";
        }

        function createTaskElement(text, completed) {
            const li = document.createElement("li");
            if (completed) li.classList.add("completed");

            const span = document.createElement("span");
            span.textContent = text;

            const buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("task-buttons");

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "✓";
            completeBtn.classList.add("complete-btn");
            completeBtn.onclick = () => {
                li.classList.toggle("completed");
                saveTasks();
            };

            const editBtn = document.createElement("button");
            editBtn.textContent = "✎";
            editBtn.classList.add("edit-btn");
            editBtn.onclick = () => {
                const newText = prompt("Edit task:", span.textContent);
                if (newText !== null && newText.trim() !== "") {
                    span.textContent = newText.trim();
                    saveTasks();
                }
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => {
                li.remove();
                saveTasks();
            };

            buttonsDiv.appendChild(completeBtn);
            buttonsDiv.appendChild(editBtn);
            buttonsDiv.appendChild(deleteBtn);

            li.appendChild(span);
            li.appendChild(buttonsDiv);
            taskList.appendChild(li);
        }

        function saveTasks() {
            const tasks = [];
            document.querySelectorAll("#taskList li").forEach(li => {
                tasks.push({
                    text: li.querySelector("span").textContent,
                    completed: li.classList.contains("completed")
                });
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }