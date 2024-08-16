import React from "react";
import AccountItem from "./AccountItem";


const AccountList = ({ accounts, onDelete, onEdit }) => {

    if (accounts.length === 0) {
        return <p>No accounts available</p>;
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {
            accounts.map((account) => (
            <AccountItem 
                key={account._id}
                prop={account}
                onEdit={() => onEdit(account)}
                onDelete={() => onDelete(account._id)}
            />
            ))
        }
        </div>
    );
    }

export default AccountList;