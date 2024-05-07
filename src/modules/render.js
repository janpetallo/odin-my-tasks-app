
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

        projectDiv.addEventListener('click', () => {
            // remove  selected class from all projects
            document.querySelectorAll('.project').forEach(project => {
                project.classList.remove('selected');
            });

            // add it to the clicked project
            projectDiv.classList.add('selected');
    
            this.renderTodoList(project);

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
        taskDiv.innerHTML = todoItem.title;
        this.todoList.appendChild(taskDiv);
    }
}

export { Render };
