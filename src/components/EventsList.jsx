import React from "react";
import Item from "./Item";

const EventsList = ({events, onDelete, onEdit}) => {

  if (events.length === 0) {
    return <p>No events available</p>;
  }

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {
        events.map((event) => (
          <Item 
            key={event._id}
            prop={event}
            onEdit={() => onEdit(event)}
            onDelete={() => onDelete(event._id)}
          />
        ))
      }
    </div>
  );
}

export default EventsList;