import axios from 'axios';

const API_URL ='https://ethara-ai-assignment-seh4.onrender.com/api' || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Project API
export const projectAPI = {
  createProject: (data) => api.post('/projects', data),
  getProjects: () => api.get('/projects'),
  getProject: (id) => api.get(`/projects/${id}`),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  addMember: (id, data) => api.post(`/projects/${id}/members`, data),
  removeMember: (id, data) => api.delete(`/projects/${id}/members`, { data }),
  updateMemberRole: (id, data) => api.put(`/projects/${id}/members`, data)
};

// Task API
export const taskAPI = {
  createTask: (projectId, data) => api.post(`/tasks/project/${projectId}`, data),
  getProjectTasks: (projectId, filters = {}) => 
    api.get(`/tasks/project/${projectId}`, { params: filters }),
  getTask: (id) => api.get(`/tasks/${id}`),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  addComment: (id, data) => api.post(`/tasks/${id}/comments`, data)
};

// Admin API
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  updateUserRole: (data) => api.put('/admin/users', data),
  deleteUser: (data) => api.delete('/admin/users', { data }),
  getDashboardStats: () => api.get('/admin/stats')
};

export default api;