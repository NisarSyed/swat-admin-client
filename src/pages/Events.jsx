import EventsList from "../components/EventsList";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Plus, X } from "lucide-react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fromDate: null,
    toDate: null,
    images: [], // This will store both existing image URLs and new File objects
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/events", {
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
      fromDate: event.from || null,
      toDate: event.to || null,
      images: event.images || [],
    });
    setIsEditing(true);
    setEditingId(event._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
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
    data.append("from", formData.fromDate);
    data.append("to", formData.toDate);
    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }
    if (isEditing) {
      try {
        await axios.put(
          `http://localhost:5000/api/events/${editingId}`,
          data,
          config
        );
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:5000/api/events", data, config);
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
      fromDate: null,
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
};
