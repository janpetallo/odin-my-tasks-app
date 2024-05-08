import { format, formatDistance } from "date-fns";

class Render {
    constructor() {
        this.projectList = document.querySelector('.project-list');
        this.todoList = document.querySelector('.todo-list');
    }

    renderProjects(projects) {
        this.projectList.innerHTML = '';
        projects.getProjects().forEach(project => this.renderProject(projects, project));
    }

    renderProject(projects, project) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');
        projectTitle.innerHTML = project.name;

        projectDiv.appendChild(projectTitle);

        // If the project's name is not 'My Project', add a delete icon
        if (project.name !== 'My Project') {
            // add a delete svg icon to the project
            const deleteIcon = document.createElement('div');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

            deleteIcon.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent the project from being selected
                projects.removeProject(project);
                this.renderProjects(projects);
            }

            );

            projectDiv.appendChild(deleteIcon);
        }

        
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

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.innerHTML = todoItem.title;

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        dateDiv.innerHTML = format(todoItem.dueDate, 'MMMM dd, yyyy');

        // if it is past due, add a class to the task
        if (new Date(todoItem.dueDate) < new Date()) {
            dateDiv.classList.add('past-due');

            // Calculate the time difference
            const timeDifference = formatDistance(
                new Date(todoItem.dueDate),
                new Date(),
                { addSuffix: true }
            );

            // Display the time difference
            dateDiv.innerHTML += ` (${timeDifference})`;
        }
        

        taskDiv.appendChild(titleDiv);
        taskDiv.appendChild(dateDiv);

        this.todoList.appendChild(taskDiv);
    }
}

export { Render };
