import { format, formatDistance, toDate, subDays } from "date-fns";
import { saveProjects } from "./storage";

class Render {
    constructor() {
        this.projectList = document.querySelector('.project-list');
        this.todoList = document.querySelector('.todo-list');
        this.projects;
    }

    renderProjects(projects) {
        this.projectList.innerHTML = '';
        this.projects = projects;
        projects.getProjects().forEach(project => this.renderProject(project));
    }

    renderProject(project) {
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
                this.projects.removeProject(project);
                saveProjects(this.projects);
                this.renderProjects(this.projects);
            });

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
        project.todoList.forEach(todoItem => this.renderTodoItem(project, todoItem));
    }

    renderTodoItem(project, todoItem) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.classList.add(todoItem.priority);

        // checklist icon
        const checklistIcon = document.createElement('div');
        checklistIcon.classList.add('checklist-icon');
        checklistIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.innerHTML = todoItem.title;

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        const dueDate = new Date(`${todoItem.dueDate}T23:59:59`);
        const today = new Date();
        today.setHours(0,0,0,0); // set the time to 00:00:00.000

        if (dueDate.toDateString() === today.toDateString()) {
            dateDiv.innerHTML = 'Today';
        } else {
            dateDiv.innerHTML = format(`${todoItem.dueDate}T00:00`, 'MMMM dd, yyyy');
        }

        // if it is past due, add a class to the task
        if (dueDate < new Date() ) {
            dateDiv.classList.add('past-due');

            // Calculate the time difference
            let timeDifference = formatDistance(
                new Date(`${todoItem.dueDate}T24:00:00`),
                new Date(),
                { addSuffix: true }
            );

            // Check if the time difference is less than 24 hours
            if (dueDate < new Date() && dueDate > subDays(new Date(), 1)) {
                timeDifference = '1 day ago';
            }

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
        
        deleteIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent the task from being selected
            project.removeTodoItem(todoItem);
            saveProjects(this.projects);
            this.renderTodoList(project);
        });


        // wrap date, edit an delete in a div
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('action');
        actionDiv.appendChild(dateDiv);
        actionDiv.appendChild(editIcon);
        actionDiv.appendChild(deleteIcon);

        // wrap checklist, title in a div
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.appendChild(checklistIcon);
        contentDiv.appendChild(titleDiv);

        // add the content and action div to the task div
        taskDiv.appendChild(contentDiv);
        taskDiv.appendChild(actionDiv);

        this.todoList.appendChild(taskDiv);
    }
}

export { Render };
