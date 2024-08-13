import React from "react";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";
import { dateFormatter } from "../utils/dateFormatter";

const Item = ({ prop, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-bold">{prop.title}</h3>
      <p className="text-sm">
        From: {prop.from ? dateFormatter(prop.from) : "-"}
      </p>
      <p className="text-sm">To: {prop.to ? dateFormatter(prop.to) : "-"}</p>
      <div className="mt-4 flex justify-end">
        <button className="p-2" onClick={onEdit}>
          <Edit color="blue" />
        </button>
        <button className="p-2" onClick={onDelete}>
          <Trash color="red" />
        </button>
      </div>
    </div>
  );
};

export default Item;
