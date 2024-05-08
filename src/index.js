
// Import our custom CSS
import './scss/styles.scss';
import './styles.css'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { Render } from './modules/render';
import { Project } from './modules/project';
import { Projects } from './modules/projects';
import { TodoItem } from './modules/todoItem';

import { initializeProjectModal } from './modules/modal';
import { initializeTodoModal } from './modules/modal';

import { saveProjects, getProjects } from './modules/storage';


const projects = new Projects();
const ui = new Render();

// Initialize the modals
var addProjectModal = new bootstrap.Modal(document.getElementById('addProjectModal'), {});
initializeProjectModal(addProjectModal, projects, ui);

var addTodoModal = new bootstrap.Modal(document.getElementById('addTodoModal'), {});
initializeTodoModal(addTodoModal, projects, ui);

// Get the saved projects from local storage, if there are any
getProjects(projects);

// Render the projects and todos
ui.renderProjects(projects);