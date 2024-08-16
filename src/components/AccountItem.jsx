import React from "react";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";
import { dateFormatter } from "../utils/dateFormatter";

const Item = ({ prop, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-normal">{prop.bankName}</h3>
      <h3 className="font-normal">{prop.accountNumber}</h3>
        <h3 className="font-normal">{prop.branchName}</h3>
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