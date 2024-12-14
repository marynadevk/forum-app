import api from './client';

export const getCommentsTree = async (rootId: string, limit: string) => {
  const response = await api.get('/comment/tree', { params: {rootId, limit}});
  return response.data;
};

export const createComment = async (data: any) => {
  const response = await api.post('/comment', data);
  return response.data;
};

export const updateComment = async (commentId: string, data: any) => {
  const response = await api.put(`/comment/${commentId}`, data);
  return response.data;
};

export const deleteComment = async (commentId: string) => {
  const response = await api.delete(`/comment/${commentId}`);
  return response.data;
};

export const likeComment = async (commentId: string) => {
  const response = await api.put(`/comment/${commentId}/like`);
  return response.data;
};

export const unlikeComment = async (commentId: string) => {
  const response = await api.put(`/comment/${commentId}/unlike`);
  return response.data;
};
