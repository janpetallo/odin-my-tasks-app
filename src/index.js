import './styles.css'
import { Render } from './modules/render';
import { Project } from './modules/project';
import { Projects } from './modules/projects';
import { TodoItem } from './modules/todoItem';

const projects = new Projects();
const ui = new Render();

// Add some projects and todos...
const project1 = new Project('Project 1');
project1.addTodoItem(new TodoItem('Todo 1', 'Description 1', '2022-12-31', 'High', 'Notes 1'));
projects.addProject(project1);

const project2 = new Project('Project 2');
project2.addTodoItem(new TodoItem('Todo 2', 'Description 2', '2022-12-31', 'Low', 'Notes 2'));
projects.addProject(project2);

// Render the projects and todos
ui.renderProjects(projects.getProjects());
ui.renderTodoList(project1);



