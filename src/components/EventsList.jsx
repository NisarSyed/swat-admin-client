import React from "react";
import Item from "./Item";

const EventsList = ({event, onDelete, onEdit}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Item 
            key={event._id}
            event={event}
            onEdit={() => onEdit(event)}
            onDelete={() => onDelete(event._id)}
        />
    </div>
  );
}

export default EventsList;