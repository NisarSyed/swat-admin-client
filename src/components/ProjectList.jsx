import React, { useEffect, useState } from "react";
import Item from "./Item";

const ProjectList = ({ projects, onEdit, onDelete }) => {
  if (projects.length === 0) {
    return <p>No projects available</p>;
  }

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
