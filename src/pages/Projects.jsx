import React, { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";


const Projects = () => {

    const [selectedProject, setSelectedProject] = useState(null);

    const handleEdit = (project) => {
        setSelectedProject(project);
    };

    const handleSave = () => {
        setSelectedProject(null);
    };

    return (
        <div>
            <ProjectForm project={selectedProject} onSave={handleSave} />
            <ProjectList onEdit={handleEdit} />
        </div>
    );
};

export default Projects;