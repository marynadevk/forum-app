import api from './client';

export const getUser = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/users/profile/${userId}`);
  return response.data;
};

export const updateUser = async (userId: string, data: any) => {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
};

export const deleteUser = async (userId: string, password: string) => {
  const response = await api.delete(`/users/${userId}`, { data: { password } });
  return response.data;
};
