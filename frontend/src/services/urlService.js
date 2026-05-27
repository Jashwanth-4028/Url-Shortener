import api from './api';

export const createUrl = (data) => api.post('/url/create', data);
export const getMyUrls = () => api.get('/url/myurls');
export const updateUrl = (id, data) => api.put(`/url/${id}`, data);
export const deleteUrl = (id) => api.delete(`/url/${id}`);
export const getPublicStats = (shortCode) => api.get(`/url/public/${shortCode}`);
export const getAnalytics = (id) => api.get(`/analytics/${id}`);
