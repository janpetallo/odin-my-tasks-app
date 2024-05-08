
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


const projects = new Projects();
const ui = new Render();

// Initialize the modals
var addProjectModal = new bootstrap.Modal(document.getElementById('addProjectModal'), {});
initializeProjectModal(addProjectModal, projects, ui);

var addTodoModal = new bootstrap.Modal(document.getElementById('addTodoModal'), {});
initializeTodoModal(addTodoModal, projects, ui);


// Add some projects and todos...
// Default Project
const defaultProject = new Project('My Project');
projects.addProject(defaultProject);


const project1 = new Project('Project 1');
project1.addTodoItem(new TodoItem('Todo 1', 'Description 1', '2022-12-31', 'High'));
projects.addProject(project1);

const project2 = new Project('Project 2');
project2.addTodoItem(new TodoItem('Todo 2', 'Description 2', '2022-12-31', 'Low'));
projects.addProject(project2);

// Render the projects and todos
ui.renderProjects(projects.getProjects());
ui.renderTodoList(project1);