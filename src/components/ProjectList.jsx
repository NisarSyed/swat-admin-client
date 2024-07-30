import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ onEdit }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
	const fetchProjects = async () => {
	  try {
		const token = localStorage.getItem('token');
		const response = await axios.get("http://localhost:5000/api/projects", {
		  headers: { Authorization: `Bearer ${token}` }
		});
		setProjects(response.data);
	  } catch (error) {
		console.error("Error fetching projects:", error);
	  }
	};

	fetchProjects();
  }, []);

  return (
	<div>
	  {projects.map((project) => (
		<ProjectItem key={project.id} project={project} onEdit={onEdit} />
	  ))}
	</div>
  );
};

export default ProjectList;
