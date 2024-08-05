import React from "react";

const EventsList = ({event, onDelete, onEdit}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <EventsItem 
            key={event._id}
            event={event}
            onEdit={() => onEdit(event)}
            onDelete={() => onDelete(event._id)}
        />
    </div>
  );
}