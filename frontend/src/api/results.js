import api from './axios';

export const getResultsApi = () => api.get('/results');
export const getResultApi = (id) => api.get(`/results/${id}`);
