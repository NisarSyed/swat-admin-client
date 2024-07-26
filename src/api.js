// api.js
import axios from 'axios';
import asyncHandler from 'express-async-handler';

const API_BASE_URL = 'http://localhost:5000/api';

export const register = async (username, password, email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            password,
            email
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
// Login a user
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

// Get the projects
export const getProjects = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        return response.data;
    } catch (error) {
        console.error('Error getting projects:', error);
        throw error;
    }
};

// Get the drives
export const getDrives = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/drives`);
        return response.data;
    } catch (error) {
        console.error('Error getting drives:', error);
        throw error;
    }
};

