import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectList from "../components/ProjectList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Plus, X } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    from: null,
    to: null,
    images: [], // This will store both existing image URLs and new File objects
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || "",
      description: project.description || "",
      from: project.from || null,
      to: project.to || null,
      images: project.images || [],
    });
    setIsEditing(true);
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const sendData = new FormData();
    sendData.append("title", formData.title);
    sendData.append("description", formData.description);
    sendData.append("from", formData.from);
    sendData.append("to", formData.to);

    formData.images.forEach((image) => {
      sendData.append("images", image);
    });

    try {
      if (isEditing) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/projects/${editingId}`,
          sendData,
          config
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/projects`,
          sendData,
          config
        );
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDateChange = (date, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      from: null,
      to: null,
      images: [],
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = () => {
    resetForm();
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-500 text-white p-2 rounded flex items-center"
      >
        {showForm ? <X size={20} /> : <Plus size={20} />}
        <span className="ml-2">{showForm ? "Cancel" : "Add New Project"}</span>
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-gray-100 p-4 rounded-lg"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          ></textarea>
          <div>
            <label className="block">Images</label>
            <input
              type="file"
              id="images"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <div className="flex flex-wrap mt-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative m-1">
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`Image ${index + 1}`}
                    className="w-32 h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <label className="block">From Date</label>
            <DatePicker
              selected={formData.from}
              onChange={(date) => handleDateChange(date, "from")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mb-2">
            <label className="block">To Date</label>
            <DatePicker
              selected={formData.to}
              onChange={(date) => handleDateChange(date, "to")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
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

      <ProjectList
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Projects;
