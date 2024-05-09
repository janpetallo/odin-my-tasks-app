import { format, formatDistance, toDate } from "date-fns";

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
        dateDiv.innerHTML = format(`${todoItem.dueDate}T24:00:00Z`, 'MMMM dd, yyyy'); 
        
        // if it is past due, add a class to the task
        if (new Date(`${todoItem.dueDate}T24:00:00Z`) < new Date() ) {
            dateDiv.classList.add('past-due');

            // Calculate the time difference
            const timeDifference = formatDistance(
                new Date(`${todoItem.dueDate}T24:00:00Z`),
                new Date(),
                { addSuffix: true }
            );

            // Display the time difference
            dateDiv.innerHTML += ` (${timeDifference})`;
        }

        // add a edit button to the task
        const editIcon = document.createElement('div');
        editIcon.classList.add('edit-icon');
        editIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>';

        // add a delete icon to the task
        const deleteIcon = document.createElement('div');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

        
        taskDiv.appendChild(titleDiv);
        taskDiv.appendChild(dateDiv);
        taskDiv.appendChild(editIcon);
        taskDiv.appendChild(deleteIcon);

        this.todoList.appendChild(taskDiv);
    }
}

export { Render };
