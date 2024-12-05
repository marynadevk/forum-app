import api from './client';
//TODO get paginated threads from the server
export const getThreads = async (page: number, limit: number) => {
  const response = await api.get('/post', { params: { page, limit } });
  return response.data;
};

export const getUsersThreads = async (userId: string, page: number, limit: number) => {
  const response = await api.get(`/post/author/${userId}`, { params: { page, limit } });
  return response.data;
}; //DONE

export const getThread = async (threadId: string) => {
  const response = await api.get(`/post/${threadId}`);
  return response.data;
}; //DONE

export const createThread = async (data: any) => {
  const response = await api.post('/post', data);
  return response.data;
}; //DONE

export const updateThread = async (threadId: string, data: any) => {
  const response = await api.put(`/post/${threadId}`, data);
  return response.data;
}; //DONE

export const deleteThread = async (threadId: string) => {
  const response = await api.delete(`/post/${threadId}`);
  return response.data;
}; //DONE

export const likeThread = async (threadId: string) => {
  const response = await api.put(`/post/${threadId}/like`);
  return response.data;
};

export const unlikeThread = async (threadId: string) => {
  const response = await api.put(`/post/${threadId}/unlike`);
  return response.data;
};
