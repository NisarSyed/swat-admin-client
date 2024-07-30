import React from "react";
import axios from "axios";

const ProjectItem = ({project,onEdit}) => {

    const handleDelete = async () => {

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.delete(`http://localhost:5000/api/projects/${project._id}`, config);
            onEdit();
        }catch (error) {
            console.error("Error deleting project:", error);
        }


  return (
    <div>
        <h3>{project.title}</h3>
        <p>{project.toDate}</p>
        <p>{project.fromDate}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => onEdit(project)}>Edit</button>
    </div>
  )
}

}
export default ProjectItem