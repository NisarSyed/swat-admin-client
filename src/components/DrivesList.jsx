import React from "react";
import Item from "./Item";


const DrivesList = ({drives, onDelete, onEdit}) => {

    if (drives.length === 0) {
        return <p>No drives available</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {
            drives.map((drive) => (
                <Item 
                    key={drive._id}
                    prop={drive}
                    onEdit={() => onEdit(drive)}
                    onDelete={() => onDelete(drive._id)}
                />
            ))
        }
        </div>
    );
}

export default DrivesList;