import api from './axios';

export const getProfileApi = () => api.get('/users/profile');
export const updateProfileApi = (formData) =>
    api.put('/users/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const changePasswordApi = (data) => api.put('/users/change-password', data);
