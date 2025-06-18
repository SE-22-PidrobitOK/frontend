import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Moderation Service
const moderationService = {
  // Vacancy Moderation
  getPendingVacancies: async (filters = {}) => {
    try {
      const response = await api.get('/moderation/review/jobs', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при отриманні вакансій для модерації');
    }
  },

  approveVacancy: async (vacancyId, reason) => {
    try {
      const response = await api.post(`/moderation/approve/${vacancyId}`, { reason });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при схваленні вакансії');
    }
  },

  rejectVacancy: async (vacancyId, reason) => {
    try {
      const response = await api.post(`/moderation/reject/${vacancyId}`, { reason });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при відхиленні вакансії');
    }
  },

  editVacancy: async (vacancyId, changes) => {
    try {
      const response = await api.put(`/moderation/edit/${vacancyId}`, changes);
      return response.data;
    } catch (error) {
      throw new Error('Помилка при редагуванні вакансії');
    }
  },

  // Complaint Management
  getComplaints: async (filters = {}) => {
    try {
      const response = await api.get('/complaints', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при отриманні скарг');
    }
  },

  resolveComplaint: async (complaintId, resolution) => {
    try {
      const response = await api.post(`/complaints/resolve/${complaintId}`, resolution);
      return response.data;
    } catch (error) {
      throw new Error('Помилка при вирішенні скарги');
    }
  },

  investigateComplaint: async (complaintId) => {
    try {
      const response = await api.post(`/complaints/investigate/${complaintId}`);
      return response.data;
    } catch (error) {
      throw new Error('Помилка при розслідуванні скарги');
    }
  },

  // User Management
  getUsers: async (filters = {}) => {
    try {
      const response = await api.get('/moderation/users', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при отриманні користувачів');
    }
  },

  blockUser: async (userId, reason, duration) => {
    try {
      const response = await api.post(`/user/block/${userId}`, { reason, duration });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при блокуванні користувача');
    }
  },

  unblockUser: async (userId, reason) => {
    try {
      const response = await api.post(`/user/unblock/${userId}`, { reason });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при розблокуванні користувача');
    }
  },

  warnUser: async (userId, reason) => {
    try {
      const response = await api.post(`/user/warn/${userId}`, { reason });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при попередженні користувача');
    }
  },

  // Moderation History
  getModerationHistory: async (filters = {}) => {
    try {
      const response = await api.get('/moderation/history', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при отриманні історії модерації');
    }
  },

  // Statistics
  getModerationStats: async () => {
    try {
      const response = await api.get('/moderation/stats');
      return response.data;
    } catch (error) {
      throw new Error('Помилка при отриманні статистики');
    }
  },

  // Content Analysis
  analyzeContent: async (content, contentType) => {
    try {
      const response = await api.post('/moderation/analyze', { content, contentType });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при аналізі контенту');
    }
  },

  // Bulk Actions
  bulkApprove: async (vacancyIds, reason) => {
    try {
      const response = await api.post('/moderation/bulk/approve', { vacancyIds, reason });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при масовому схваленні');
    }
  },

  bulkReject: async (vacancyIds, reason) => {
    try {
      const response = await api.post('/moderation/bulk/reject', { vacancyIds, reason });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при масовому відхиленні');
    }
  },

  // Settings
  getModerationSettings: async () => {
    try {
      const response = await api.get('/moderation/settings');
      return response.data;
    } catch (error) {
      throw new Error('Помилка при отриманні налаштувань');
    }
  },

  updateModerationSettings: async (settings) => {
    try {
      const response = await api.put('/moderation/settings', settings);
      return response.data;
    } catch (error) {
      throw new Error('Помилка при оновленні налаштувань');
    }
  },

  // Notifications
  sendModerationNotification: async (userId, notification) => {
    try {
      const response = await api.post('/moderation/notify', { userId, notification });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при надсиланні повідомлення');
    }
  },

  // Export
  exportModerationData: async (filters = {}, format = 'csv') => {
    try {
      const response = await api.get('/moderation/export', { 
        params: { ...filters, format },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error('Помилка при експорті даних');
    }
  },

  // Auto-moderation
  enableAutoModeration: async (settings) => {
    try {
      const response = await api.post('/moderation/auto/enable', settings);
      return response.data;
    } catch (error) {
      throw new Error('Помилка при встановленні автодерації');
    }
  },

  disableAutoModeration: async () => {
    try {
      const response = await api.post('/moderation/auto/disable');
      return response.data;
    } catch (error) {
      throw new Error('Помилка при вимкненні автодерації');
    }
  },

  getAutoModerationStatus: async () => {
    try {
      const response = await api.get('/moderation/auto/status');
      return response.data;
    } catch (error) {
      throw new Error('Помилка при отриманні статусу автодерації');
    }
  }
};

export default moderationService; 