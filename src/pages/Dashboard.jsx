import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [bannerImages, setBannerImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    fetchBannerImages();
  }, []);

  const fetchBannerImages = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/banners");
      setBannerImages(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching banner images"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await api.post("/banners", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setBannerImages((prevImages) => [...prevImages, response.data]);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to upload image");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/banners/${id}`);
      setBannerImages((prevImages) =>
        prevImages.filter((image) => image._id !== id)
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete image");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 mt-2">
          <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl text-center font-semibold">
            Welcome to SWAT Admin Panel
          </h2>
          <p className="text-center text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10">
            This is a simple admin panel for managing users, projects, drives,
            and events.
          </p>
          <p className="text-center mb-2">Manage your banner images below.</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="block mx-auto mt-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            {showForm ? "Hide Upload Form" : "Show Upload Form"}
          </button>

          {showForm && (
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Upload New Banner Image:
              </h3>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  transition duration-300 ease-in-out"
              />
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Current Banner Images:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bannerImages.map((image) => (
                <div key={image._id} className="relative group">
                  <img
                    src={image.image}
                    alt={`Banner ${image._id}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                    aria-label="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
