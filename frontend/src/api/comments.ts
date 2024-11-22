import api from './client';

export const getThreadComments = async (threadId: string) => {
  const response = await api.get(`/comments/${threadId}`);
  return response.data;
};

export const getCommentComments = async (commentId: string) => {
  const response = await api.get(`/comments/${commentId}`);
  return response.data;
};

export const createComment = async (data: any) => {
  const response = await api.post('/comments', data);
  return response.data;
};

export const updateComment = async (commentId: string, data: any) => {
  const response = await api.put(`/comments/${commentId}`, data);
  return response.data;
};

export const deleteComment = async (commentId: string) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
};

export const likeComment = async (commentId: string) => {
  const response = await api.put(`/comments/${commentId}/like`);
  return response.data;
};

export const unlikeComment = async (commentId: string) => {
  const response = await api.put(`/comments/${commentId}/unlike`);
  return response.data;
};
