import React from "react";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";

const Item = ({ drive, onEdit, onDelete }) => {
    console.log("drive data", drive);
    return (
        <div className="border p-4 rounded-lg">
            <h3 className="font-bold">{drive.title}</h3>
            <p className="text-sm">
                From: {drive.fromDate ? new Date(drive.fromDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="text-sm">
                To: {drive.toDate ? new Date(drive.toDate).toLocaleDateString() : 'N/A'}
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