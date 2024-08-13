import React from "react";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";

const Item = ({ prop, onEdit, onDelete }) => {
    console.log("prop data", prop);
    return (
        <div className="border p-4 rounded-lg">
            <h3 className="font-bold">{prop.title}</h3>
            <p className="text-sm">
                From: {prop.fromDate ? new Date(prop.fromDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="text-sm">
                To: {prop.toDate ? new Date(prop.toDate).toLocaleDateString() : 'N/A'}
            </p>
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