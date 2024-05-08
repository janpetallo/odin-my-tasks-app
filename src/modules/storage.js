import { Project } from './project';
import { TodoItem } from './todoItem';

function saveProjects(projects) {
  localStorage.setItem('projects', JSON.stringify(projects))
}

function getProjects(projects) {
  const savedProjects = JSON.parse(localStorage.getItem('projects'));

  // If there are saved projects, add them to the projects object
  if (savedProjects) {
    savedProjects.forEach(savedProject => {
        const project = new Project(savedProject.name);
        savedProject.todoList.forEach(savedTodo => {
            const todo = new TodoItem(savedTodo.title, savedTodo.description, savedTodo.dueDate, savedTodo.priority);
            project.addTodoItem(todo);
        });
        projects.addProject(project);
    });
  } else {
    // If there are no saved projects, create a default project
    const defaultProject = new Project('My Project');
    projects.addProject(defaultProject);

    saveProjects(projects.getProjects()); // save the default project to local storage
  }
}

export { saveProjects, getProjects };

