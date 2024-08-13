import React, { useEffect, useState } from "react";
import Item from "./Item";
const ProjectList = ({ projects,  onEdit, onDelete }) => {

  return (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
	  {projects.map((project) => (
		<Item
		  key={project._id}
		  prop={project}
		  onEdit={() => onEdit(project)}
		  onDelete={() => onDelete(project._id)}
		/>
	  ))}
	</div>
  );
};

export default ProjectList;
