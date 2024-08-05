import React from "react";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";


const DrivesItem = ({drive,onEdit, onDelete}) => {

    return (
        <div className="border p-4 rounded-lg">
            <h3 className="font-bold">{drive.title}</h3>
            <p className="text-sm text-gray-600">ID: {drive._id}</p>
            <p className="mt-2">{drive.description}</p>
            <p className="text-sm">From: {drive.fromDate}</p>
            <p className="text-sm">To: {drive.toDate}</p>
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

export default DrivesItem