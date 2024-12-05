import api from './client';

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/profile/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId: string, data: any) => {
  const response = await api.put(`/profile/${userId}`, data);
  return response.data;
};

export const deleteUserProfile = async (userId: string, password: string) => {
  const response = await api.delete(`/profile/${userId}`, { data: { password } });
  return response.data;
};
