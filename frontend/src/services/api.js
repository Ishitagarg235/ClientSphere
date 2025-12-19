import axios from 'axios';

// Base URL for your backend
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  
  add: async (formData) => {
    const response = await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Clients API
export const clientsAPI = {
  getAll: async () => {
    const response = await api.get('/clients');
    return response.data;
  },
  
  add: async (formData) => {
    const response = await api.post('/clients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Contacts API
export const contactsAPI = {
  getAll: async () => {
    const response = await api.get('/contacts');
    return response.data;
  },
  
  submit: async (data) => {
    const response = await api.post('/contacts', data);
    return response.data;
  },
};

// Newsletter API
export const newsletterAPI = {
  getAll: async () => {
    const response = await api.get('/newsletter');
    return response.data;
  },
  
  subscribe: async (data) => {
    const response = await api.post('/newsletter', data);
    return response.data;
  },
};

export default api;