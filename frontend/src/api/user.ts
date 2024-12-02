import api from './client';

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/user/profile/${userId}`);
  return response.data;
};

export const updateUser = async (userId: string, data: any) => {
  const response = await api.put(`/user/update-profile/${userId}`, data);
  return response.data;
};

export const deleteUser = async (userId: string, password: string) => {
  const response = await api.delete(`/user/delete-profile/${userId}`, { data: { password } });
  return response.data;
};
