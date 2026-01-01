import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
}

// Contact endpoints
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  getById: (id) => api.get(`/contact/${id}`),
  update: (id, data) => api.put(`/contact/${id}`, data),
  delete: (id) => api.delete(`/contact/${id}`),
}

// Chat endpoints
export const chatAPI = {
  sendMessage: (data) => api.post('/chat/message', data),
  getConversation: (conversationId) => api.get(`/chat/conversation/${conversationId}`),
  getConversations: () => api.get('/chat/conversations'),
  sendResponse: (messageId, data) => api.post(`/chat/message/${messageId}/respond`, data),
}

// AI endpoints
export const aiAPI = {
  generateResponse: (prompt) => api.post('/ai/generate', { prompt }),
  analyzeMessage: (message) => api.post('/ai/analyze', { message }),
}

// Newsletter endpoints
export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
  unsubscribe: (email) => api.post('/newsletter/unsubscribe', { email }),
}

export default api
