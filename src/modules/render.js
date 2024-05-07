
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
