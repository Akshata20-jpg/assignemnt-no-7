$(document).ready(function() {
    // Load tasks from localStorage on page load
    loadTasks();

    // Add Task
    $('#addTaskBtn').click(function() {
        var taskText = $('#taskInput').val();
        if (taskText) {
            var tasks = getTasksFromStorage();
            tasks.push({ id: Date.now(), text: taskText });
            saveTasksToStorage(tasks);
            $('#taskInput').val('');
            loadTasks();
        }
    });

    // Edit Task
    $(document).on('click', '.editBtn', function() {
        var taskId = $(this).data('id');
        var tasks = getTasksFromStorage();
        var task = tasks.find(t => t.id === taskId);
        var newText = prompt("Edit your task:", task.text);
        if (newText) {
            task.text = newText;
            saveTasksToStorage(tasks);
            loadTasks();
        }
    });

    // Delete Task
    $(document).on('click', '.deleteBtn', function() {
        var taskId = $(this).data('id');
        var tasks = getTasksFromStorage();
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasksToStorage(tasks);
        loadTasks();
    });

    // Function to load tasks from localStorage
    function loadTasks() {
        var tasks = getTasksFromStorage();
        var taskListHtml = '';
        tasks.forEach(function(task) {
            taskListHtml += `
                <div class="task-item" data-id="${task.id}">
                    <span>${task.text}</span>
                    <div>
                        <button class="btn btn-warning btn-sm editBtn" data-id="${task.id}">Edit</button>
                        <button class="btn btn-danger btn-sm deleteBtn" data-id="${task.id}">Delete</button>
                    </div>
                </div>
            `;
        });
        $('#taskList').html(taskListHtml);
    }

    // Helper function to get tasks from localStorage
    function getTasksFromStorage() {
        var tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Helper function to save tasks to localStorage
    function saveTasksToStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
