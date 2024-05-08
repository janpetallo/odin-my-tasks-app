// modal.js

import { Project } from './project.js';
import { TodoItem } from './todoItem.js';

export function initializeProjectModal(addProjectModal, projects, ui) {
    document.querySelector('#add-project-button').addEventListener('click', () => {
        addProjectModal.show();
    });

    document.querySelector('#add-project-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const projectName = document.querySelector('#project-name').value;
        if (projectName) {
            const newProject = new Project(projectName);
            projects.addProject(newProject);
            ui.renderProjects(projects.getProjects());
        }

        // Hide the modal
        addProjectModal.hide();
    });
}

export function initializeTodoModal(addTodoModal, projects, ui) {
    document.querySelector('#add-todo-button').addEventListener('click', () => {
        addTodoModal.show();
    });

    document.querySelector('#add-todo-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const todoName = document.querySelector('#todo-name').value;
        const todoDescription = document.querySelector('#todo-description').value;
        const todoDueDate = document.querySelector('#todo-due-date').value;
        const todoPriority = document.querySelector('#todo-priority').value;

        if (todoName && todoDueDate && todoPriority) {
            const newTodo = new TodoItem(todoName, todoDescription, todoDueDate, todoPriority);
            const currentProjectName = document.querySelector('.current-selected').textContent; // get the current selected project
            const currentProject = projects.getProject(currentProjectName); // get the project object
            currentProject.addTodoItem(newTodo);
            ui.renderTodoList(currentProject); // render the todo list for the selected project
            console.log(currentProject.getTodoList());
        }


        // Hide the modal
        addTodoModal.hide();
    });
}