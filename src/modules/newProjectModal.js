// modal.js

import { Project } from './project.js';

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