import api from './client';

export const getThreads = async (page: number, limit: number) => {
  const response = await api.get('/post', { params: { page, limit } });
  return response.data;
};

export const getUsersThreads = async (userId: string, page: number, limit: number) => {
  const response = await api.get(`/post/author/${userId}`, { params: { page, limit } });
  return response.data;
};

export const getThread = async (threadId: string) => {
  const response = await api.get(`/post/${threadId}`);
  return response.data;
};

export const createThread = async (data: any) => {
  const response = await api.post('/post', data);
  return response.data;
};

export const updateThread = async (threadId: string, data: any) => {
  const response = await api.put(`/post/${threadId}`, data);
  return response.data;
};

export const deleteThread = async (threadId: string) => {
  console.log('threadId', threadId);
  const response = await api.delete(`/post/${threadId}`);
  return response.data;
};

export const likeThread = async (threadId: string) => {
  const response = await api.put(`/post/${threadId}/like`);
  return response.data;
};

export const unlikeThread = async (threadId: string) => {
  const response = await api.put(`/post/${threadId}/unlike`);
  return response.data;
};
