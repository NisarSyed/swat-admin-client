import EventsList from "../components/EventsList";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Plus, X } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    from: null,
    to: null,
    images: [], // This will store both existing image URLs and new File objects
    location: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title || "",
      description: event.description || "",
      from: event.from || null,
      to: event.to || null,
      images: event.images || [],
      location: event.location || "",
    });
    setIsEditing(true);
    setEditingId(event._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("from", formData.from);
    data.append("to", formData.to);
    data.append("location", formData.location);
    formData.images.forEach((image) => data.append("images", image));
    if (isEditing) {
      try {
        await axios.put(`${API_URL}/events/${editingId}`, data, config);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      try {
        await axios.post(`${API_URL}/events`, data, config);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
    fetchEvents();
    setShowForm(false);
    setIsEditing(false);
    setFormData({
      title: "",
      description: "",
      from: null,
      toDate: null,
      images: [],
    });
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

  const handleDateChange = (date, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      from: null,
      toDate: null,
      images: [],
      location: "",
    });
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleAdd = () => {
    resetForm();
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Events</h1>
      <button
        onClick={handleAdd}
        className="flex items-center px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
      >
        {showForm ? <X size={20} /> : <Plus size={20} />}
        <span className="ml-2">{showForm ? "Cancel" : "Add New Event"}</span>
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
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
          <label className="block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          ></textarea>
          <div>
            <label className="block">From</label>
            <DatePicker
              selected={formData.from}
              onChange={(date) => handleDateChange(date, "from")}
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block">To</label>
            <DatePicker
              selected={formData.to}
              onChange={(date) => handleDateChange(date, "to")}
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block">Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
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
      <EventsList events={events} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Events;
