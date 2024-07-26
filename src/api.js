// api.js
import axios from 'axios';
import asyncHandler from 'express-async-handler';

const API_BASE_URL = 'http://localhost:5000/api';

// Register a new user
export const register = asyncHandler(async (username, password, email) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        password,
        email
    });
    return response.data;
});

// Login a user
export const login = asyncHandler(async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
});

// Get the projects
export const getProjects = asyncHandler(async () => {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
});

// Get the drives
export const getDrives = asyncHandler(async () => {
    const response = await axios.get(`${API_BASE_URL}/drives`);
    return response.data;
});

// Get the users
export const getUsers = asyncHandler(async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
});


// Get the events
export const getEvents = asyncHandler(async () => {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
});

// Get the events by id
export const getEventsbyId = asyncHandler(async (id) => {
    const response = await axios.get(`${API_BASE_URL}/events/${id}`);
    return response.data;
});

// Get the projects by id
export const getProjectsbyId = asyncHandler(async (id) => {
    const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
    return response.data;
});

// Get the drives by id
export const getDrivesbyId = asyncHandler(async (id) => {
    const response = await axios.get(`${API_BASE_URL}/drives/${id}`);
    return response.data;
});

// Delete the project
export const deleteProject = asyncHandler(async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/projects/${id}`);
    return response.data;
});

// Delete the drive
export const deleteDrive = asyncHandler(async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/drives/${id}`);
    return response.data;
});


// Delete the user
export const deleteUser = asyncHandler(async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
});

// Delete the event
export const deleteEvent = asyncHandler(async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/events/${id}`);
    return response.data;
});

// Create a new project
export const createProject = asyncHandler(async (project) => {
    const response = await axios.post(`${API_BASE_URL}/projects`, project);
    return response.data;
});

// Create a new drive
export const createDrive = asyncHandler(async (drive) => {
    const response = await axios.post(`${API_BASE_URL}/drives`, drive);
    return response.data;
});

// Create a new user
export const createUser = asyncHandler(async (user) => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
});

// Create a new event
export const createEvent = asyncHandler(async (event) => {
    const response = await axios.post(`${API_BASE_URL}/events`, event);
    return response.data;
});

// Update the project
export const updateProject = asyncHandler(async (id, project) => {
    const response = await axios.put(`${API_BASE_URL}/projects/${id}`, project);
    return response.data;
});

// Update the drive
export const updateDrive = asyncHandler(async (id, drive) => {
    const response = await axios.put(`${API_BASE_URL}/drives/${id}`, drive);
    return response.data;
});

// Update the user
export const updateEvent = asyncHandler(async (id, event) => {
    const response = await axios.put(`${API_BASE_URL}/events/${id}`, event);
    return response.data;
});

