import api from './client';
//TODO get paginated threads from the server
export const getThreads = async () => {
  const response = await api.get('/threads');
  return response.data;
};

export const getUsersThreads = async (userId: string) => {
  const response = await api.get(`/threads/user/${userId}`);
  return response.data;
};

export const getThread = async (threadId: string) => {
  const response = await api.get(`/threads/${threadId}`);
  return response.data;
};

export const createThread = async (data: any) => {
  const response = await api.post('/threads', data);
  return response.data;
};

export const updateThread = async (threadId: string, data: any) => {
  const response = await api.put(`/threads/${threadId}`, data);
  return response.data;
};

export const deleteThread = async (threadId: string) => {
  const response = await api.delete(`/threads/${threadId}`);
  return response.data;
};

export const likeThread = async (threadId: string) => {
  const response = await api.put(`/threads/${threadId}/like`);
  return response.data;
};

export const unlikeThread = async (threadId: string) => {
  const response = await api.put(`/threads/${threadId}/unlike`);
  return response.data;
};
