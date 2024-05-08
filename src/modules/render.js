
class Render {
    constructor() {
        this.projectList = document.querySelector('.project-list');
        this.todoList = document.querySelector('.todo-list');
    }

    renderProjects(projects) {
        this.projectList.innerHTML = '';
        projects.forEach(project => this.renderProject(project));
    }

    renderProject(project) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = project.name;

        // If the project's name is 'My Project', make it the default selected project
        if (project.name === 'My Project') {
            projectDiv.classList.add('current-selected');
            this.renderTodoList(project); // render the todo list for the selected project
        }

        projectDiv.addEventListener('click', () => {
            // remove  selected class from all projects
            document.querySelectorAll('.project').forEach(project => {
                project.classList.remove('current-selected');
            });

            // add it to the clicked project
            projectDiv.classList.add('current-selected');
            this.renderTodoList(project); // render the todo list for the selected project

        });
        this.projectList.appendChild(projectDiv);
    }

    renderTodoList(project) {
        this.todoList.innerHTML = '';
        project.todoList.forEach(todoItem => this.renderTodoItem(todoItem));
    }

    renderTodoItem(todoItem) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.classList.add(todoItem.priority);
        taskDiv.innerHTML = todoItem.title + ' - ' + todoItem.dueDate + ' - ' + todoItem.priority;
        this.todoList.appendChild(taskDiv);
    }
}

export { Render };
