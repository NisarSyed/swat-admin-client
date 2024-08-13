import React from "react";
import DrivesItem from "./DrivesItem";


const DrivesList = ({drives, onDelete, onEdit}) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {
            drives.map((drive) => (
                <DrivesItem 
                    key={drive._id}
                    drive={drive}
                    onEdit={() => onEdit(drive)}
                    onDelete={() => onDelete(drive._id)}
                />
            ))
        }
        </div>
    );
}

export default DrivesList;