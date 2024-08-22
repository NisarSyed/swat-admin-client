import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Plus, X } from "lucide-react";
import DrivesList from "../components/DrivesList";

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    from: null,
    to: null,
    images: [],
    location: "",
    volunteers: "",
    collaborators: "",
  });

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/drives", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDrives(response.data);
    } catch (error) {
      console.error("Error fetching drives:", error);
    }
  };

  const handleEdit = (drive) => {
    setFormData({
      title: drive.title || "",
      description: drive.description || "",
      from: drive.from || null,
      to: drive.to || null,
      images: drive.images || [],
      location: drive.location || "",
      volunteers: drive.volunteers || "",
      collaborators: drive.collaborators || "",
    });
    setIsEditing(true);
    setEditingId(drive._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/drives/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDrives();
    } catch (error) {
      console.error("Error deleting drive:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = isEditing
      ? `http://localhost:5000/api/drives/${editingId}`
      : "http://localhost:5000/api/drives";
    const method = isEditing ? "patch" : "post";

    const sendData = new FormData();

    sendData.append("title", formData.title);
    sendData.append("description", formData.description);
    sendData.append("from", formData.from);
    sendData.append("to", formData.to);
    sendData.append("location", formData.location);
    sendData.append("volunteers", formData.volunteers);
    sendData.append("collaborators", formData.collaborators);

    formData.images.forEach((image) => {
      sendData.append("images", image);
    });

    try {
      await axios[method](url, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchDrives();

      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
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

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      from: null,
      to: null,
      images: [],
      location: "",
      volunteers: "",
      collaborators: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleDateChange = (date, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const handleAdd = () => {
    resetForm();
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Drives</h1>
      <button
        onClick={handleAdd}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        {showForm ? <X size={24} /> : <Plus size={24} />}
        <span className="ml-2">{showForm ? "Cancel" : "Add Drive"}</span>
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-8 bg-gray-100 p-4 rounded-lg"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            required="required"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          ></input>
          <textarea
            name="description"
            placeholder="Description"
            required="required"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          ></textarea>
          <div>
            <label>Images</label>
            <input
              type="file"
              multiple
              id="images"
              onChange={handleImageChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            ></input>
          </div>
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
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          ></input>
          <input
            type="text"
            name="volunteers"
            placeholder="Volunteers"
            value={formData.volunteers}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          ></input>
          <input
            type="text"
            name="collaborators"
            placeholder="Collaborators"
            value={formData.collaborators}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          ></input>
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
      <DrivesList drives={drives} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Drives;
