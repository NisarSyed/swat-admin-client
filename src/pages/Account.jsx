import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Plus, X } from "lucide-react";
import AccountList from "../components/AccountsList";
import { getUser } from "../api";


const Account = () => {

    const [account, setAccount] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [formData, setFormData] = useState({
        bankName: "",
        accountNumber: "",
        branchName : "",
        accountHolderName : "",
    })

    useEffect(() => {
        fetchAccount();
    }
    , [account]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser();
                setUser(user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);



    const fetchAccount = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/accounts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAccount(response.data);
        } catch (error) {
            console.error("Error fetching account:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (account) => {
        setFormData({
            bankName: account.bankName || "",
            accountNumber: account.accountNumber || "",
            ifscCode: account.ifscCode || "",
            branchName: account.branchName || "",
            accountHolderName: account.accountHolderName || "",
        });
        setIsEditing(true);
        setEditingId(account._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/accounts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAccount();
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const resetForm = () => {

        setFormData({
            bankName: "",
            accountNumber: "",
            ifscCode: "",
            branchName: "",
            accountHolderName: "",
        });
    }

    const handleAdd = () => {
        resetForm();
        setShowForm(!showForm);
    } 

    const handleFormSubmit = async (e) => {

        e.preventDefault();

    

        const sendData = new FormData();
        sendData.append("bankName", formData.bankName);
        sendData.append("accountNumber", formData.accountNumber);
        sendData.append("branchName", formData.branchName);
        sendData.append("accountHolderName", formData.accountHolderName);
        sendData.append("user", user._id);
    

        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        if (isEditing) {
            try {
                await axios.put(
                    `http://localhost:5000/api/accounts/${editingId}`,
                    sendData ,
                    config
                );
                fetchAccount();
                setShowForm(false);
            } catch (error) {
                console.error("Error updating account:", error);
            }
        } else {
            try {
                await axios.post("http://localhost:5000/api/accounts", 
                    formData
                    , config);
                fetchAccount();
                setShowForm(false);
            } catch (error) {
                console.error("Error creating account:", error);
            }
        }
    };



    return (

        <div className = "container mx-auto p-4">
            <h1 className="text-2xl font-semibold text-gray-800">Account</h1>
            <button
            onClick={handleAdd}
            className="mb-4 bg-blue-500 text-white p-2 rounded flex items-center"
        >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            <span className="ml-2">{showForm ? "Cancel" : "Add New Account"}</span>
      </button>
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-8 bg-gray-100 p-4 rounded-lg"
        >
        <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            placeholder="Bank Name"
            className="w-full p-2 mb-4 border rounded"
            />
            <div>
                <label className="mb-1">Account Number</label>
            <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Account Number"
            className="w-full p-2 mb-4 border rounded"
            />
            </div>
            <div>
            <label className="mb-1">Branch Name</label>
            <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleInputChange}
            placeholder="Branch Name"
            className="w-full p-2 mb-4 border rounded"
            />
            </div>
            <div>
            <label className="mb-1">Account Holder Name</label>
            <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleInputChange}
            placeholder="Account Holder Name"
            className="w-full p-2 mb-4 border rounded"
            />
            </div>
        <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            >
              {isEditing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-900"
            >
              Reset
            </button>
          </div>
          
        </form>
      )}

      <AccountList
        accounts={account}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Account;
