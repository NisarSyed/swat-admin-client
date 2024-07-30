import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const ProjectForm = ({project}) => {

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem("token") === null) {
            navigate("/");
        }
        if (project){
            setTitle(project.title);
            setSubTitle(project.subTitle);
            setDescription(project.description);
            setFromDate(project.fromDate);
            setToDate(project.toDate);
        }
    }, [project]);


    const handleSubmit = async (e) => {

        e.preventDefault();
        const token = localStorage.getItem("token");
        const config = {
            headers :
            {
                Authorization: `Bearer ${token}`,
            }
        };
        const data = {
            title,
            subTitle,
            description,
            fromDate,
            toDate,
        };
        console.log(data);
        let response;
        try {
            if (project) {
                response = await axios.put(`http://localhost:5000/api/projects/${project._id}`, data, config);
                setSuccessMessage("Project updated successfully");
            } else {
                response = await axios.post("http://localhost:5000/api/projects", data, config);
                setSuccessMessage("Project created successfully");
            }
        }
        catch (error) {
            console.error("Error creating project:", error);
        }
        finally {
            setTimeout(() => {
                navigate("/projects");
            }, 2000);
        }
        

    }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form className="px-8 py-6 mt-4 text-left bg-white shadow-lg" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-center">
                Create a new project
            </h3>
            <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mt-4">
            <textarea
                placeholder="Description"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div className="mt-4">
                <label className="block">From Date</label>
                <DatePicker
                    selected={fromDate}
                    onChange={date => setFromDate(date)}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
            </div>
            <div className="mt-4">
                <label className="block">To Date</label>
                <DatePicker
                    selected={toDate}
                    onChange={date => setToDate(date)}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
            </div>
            <div className="flex items-baseline justify-between">
                <button
                    className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    type="submit"
                >
                    {project ? "Update" : "Create"}
                </button>
                {successMessage && <div className="text-green-500">{successMessage}</div>}
            </div>
        </form>
        

    </div>
  )
}

export default ProjectForm