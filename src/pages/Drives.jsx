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
    fromDate: null,
    toDate: null,
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
      fromDate: drive.from || null,
      toDate: drive.to || null,
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
    sendData.append("subtitle", formData.subtitle);
    sendData.append("description", formData.description);
    sendData.append("fromDate", formData.fromDate);
    sendData.append("toDate", formData.toDate);
    sendData.append("location", formData.location);
    sendData.append("volunteers", formData.volunteers);
    sendData.append("collaborators", formData.collaborators);

    formData.images.forEach((image) => {
      sendData.append("images", image);
    });

    console.log("sendData", sendData.get("toDate"));
    console.log("sendData", sendData.get("fromDate"));

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Drives</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        {showForm ? <X /> : <Plus />}
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
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          ></input>
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
              <div key={index} className="relative w-1/4 p-2">
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                >
                  <X />
                </button>
                <img
                  src={URL.createObjectURL(image)}
                  alt="image"
                  className="w-full rounded-lg"
                ></img>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label>From Date</label>
            <DatePicker
              selected={formData.fromDate}
              onChange={(date) =>
                setFormData({ ...formData, fromDate: date.toISOString() })
              }
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            ></DatePicker>
          </div>
          <div className="mt-4">
            <label>To Date</label>
            <DatePicker
              selected={formData.toDate}
              onChange={(date) =>
                setFormData({ ...formData, toDate: date.toISOString() })
              }
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            ></DatePicker>
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
          <div className="mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      <DrivesList drives={drives} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Drives;
