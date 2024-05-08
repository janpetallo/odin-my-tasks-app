
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
            const todo = new TodoItem(savedTodo.name, savedTodo.description, savedTodo.dueDate, savedTodo.priority);
            project.addTodoItem(todo);
        });
        projects.addProject(project);
    });
  }
}

export { saveProjects, getProjects };

