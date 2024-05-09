import { saveProjects } from "./storage";

class Projects {
    constructor() {
        this.projects = [];
    }
    
    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        this.projects = this.projects.filter(item => 
            item !== project
        );
    }
    
    getProjects() {
        return this.projects;
    }

    getProject(name) {
        return this.projects.find(project => project.name === name);
    }
}

export { Projects };