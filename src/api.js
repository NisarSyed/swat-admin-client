// api.js
import axios from "axios";

const API_REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const register = async (username, password, email) => {
  try {
    const response = await axios.post(`${API_REACT_APP_API_URL}/auth/register`, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
// Login a user
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Fetch user profile
export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
