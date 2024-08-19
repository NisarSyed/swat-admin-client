import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from "../api";


const ContactForm = () => {

  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    Name1: '',
    Name2: '',
    Email: '',
    Phone1: '',
    Phone2: '',
  });
  const [contactId, setContactId] = useState(null);

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


  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact');
        if (response.data.length > 0) {
          const contact = response.data[0];
          setFormData(contact);
          setContactId(contact._id);
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        if (!token){
            return alert("Please login to continue")
        }
      if (contactId) {
        await axios.patch(`http://localhost:5000/api/contact/${contactId}`, formData, config);
      } else {
        const response = await axios.post('http://localhost:5000/api/contact', formData, config);
        setContactId(response.data._id);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async () => {
    try {

        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      await axios.delete(`http://localhost:5000/api/contact/${contactId}`, config);
      setFormData({
        Name1: '',
        Name2: '',
        Email: '',
        Phone1: '',
        Phone2: '',
      });
      setContactId(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#1e2a4a]">Contact Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name1:</label>
            <input
              type="text"
              name="Name1"
              value={formData.Name1}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name2:</label>
            <input
              type="text"
              name="Name2"
              value={formData.Name2}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone1:</label>
            <input
              type="text"
              name="Phone1"
              value={formData.Phone1}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone2:</label>
            <input
              type="text"
              name="Phone2"
              value={formData.Phone2}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {contactId ? 'Update' : 'Submit'}
            </button>
            {contactId && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;