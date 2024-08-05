import React from "react";
import axios from "axios";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";

const ProjectItem = ({project,onEdit, onDelete}) => {


  return (
    <div className="border p-4 rounded-lg">
        <h3 className="font-bold">{project.title}</h3>
        {/* <p className="text-sm text-gray-600">ID: {project._id.toString()}</p> */}
        <p className="mt-2">{project.description}</p>
        <p className="text-sm">From: {project.fromDate}</p>
        <p className="text-sm">To: {project.toDate}</p>
        <div className="mt-4 flex justify-end">
          <button className="p-2" onClick={onEdit}>
            <Edit color="blue" />
          </button>
          <button className="p-2" onClick={onDelete}>
            <Trash color="red" />
          </button>
        </div>
    </div>
  )
}


export default ProjectItem