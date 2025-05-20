import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const getProjects = () => api.get('/projects');
export const getTutorials = () => api.get('/tutorials');
export const getTutorialsByCategory = category => api.get(`/tutorials?category=${category}`);
export const createProject = (projectData) => api.post('/projects', projectData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProject = (id, projectData) => api.post(`/projects/${id}`, projectData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProject = (id) => api.delete(`/projects/${id}`);