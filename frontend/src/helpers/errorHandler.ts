import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const handleError = (error: unknown): void => {
  if (error instanceof AxiosError && error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error('An unexpected error occurred');
  }
};
