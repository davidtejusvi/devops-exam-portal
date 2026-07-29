import api from './axios';

export const getExamsApi = () => api.get('/exams');
export const getExamApi = (slug) => api.get(`/exams/${slug}`);
export const submitExamApi = (slug, data) => api.post(`/exams/${slug}/submit`, data);
