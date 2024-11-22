import api from './client';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (
  username: string,
  email: string,
  password: string,
  avatar: string
) => {
  const response = await api.post('/auth/signup', {
    username,
    email,
    password,
    avatar,
  });
  return response.data;
};

export const checkUsernameUnique = async (username: string) => {
  const response = await api.get(`/auth/check-username?username=${username}`);
  return response.data;
};
