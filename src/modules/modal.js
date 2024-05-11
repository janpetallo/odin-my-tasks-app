
import { Project } from './project.js';
import { TodoItem } from './todoItem.js';

import {saveProjects, getProjects} from './storage.js';
import * as bootstrap from 'bootstrap';


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
            saveProjects(projects); // save the updated projects to local storage
            ui.renderProjects(projects);
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
            saveProjects(projects); // save the updated projects to local storage
            ui.renderTodoList(currentProject); // render the todo list for the selected project
            console.log(currentProject.getTodoList());
        }

        // Hide the modal
        addTodoModal.hide();
    });
}

export function initializeEditModal(editIcon, todoItem, projects, ui) {
    editIcon.addEventListener('click', () => {
        // Get the edit task modal
        const editTodoModal = document.querySelector('#editTodoModal');

        // Populate the modal with the current values of the todo item
        editTodoModal.querySelector('#edit-todo-name').value = todoItem.title;
        editTodoModal.querySelector('#edit-todo-description').value = todoItem.description;
        editTodoModal.querySelector('#edit-todo-due-date').value = todoItem.dueDate;
        editTodoModal.querySelector('#edit-todo-priority').value = todoItem.priority;

        const form = editTodoModal.querySelector('#edit-todo-form');

        const formSubmitHandler = (event) => {
            event.preventDefault();

            const todoName = form.querySelector('#edit-todo-name').value;
            const todoDescription = form.querySelector('#edit-todo-description').value;
            const todoDueDate = form.querySelector('#edit-todo-due-date').value;
            const todoPriority = form.querySelector('#edit-todo-priority').value;

            if (todoName && todoDueDate && todoPriority) {
                // Update the todo item
                todoItem.title = todoName;
                todoItem.description = todoDescription;
                todoItem.dueDate = todoDueDate;
                todoItem.priority = todoPriority;

                const currentProjectName = document.querySelector('.current-selected').textContent; // get the current selected project
                const currentProject = projects.getProject(currentProjectName); // get the project object

                saveProjects(projects); // save the updated projects to local storage
                ui.renderTodoList(currentProject); // render the todo list for the selected project
            }

            // Hide the modal
            const bootstrapModal = bootstrap.Modal.getInstance(editTodoModal);
            bootstrapModal.hide();
        };

        // Add event listener for the form submission
        form.addEventListener('submit', formSubmitHandler);

        // Open the modal
        const bootstrapModal = new bootstrap.Modal(editTodoModal);
        bootstrapModal.show();

        // Remove the event listener when the modal is hidden
        bootstrapModal._element.addEventListener('hidden.bs.modal', () => {
            form.removeEventListener('submit', formSubmitHandler);
        });
    });
}