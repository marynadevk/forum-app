import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const handleError = (error: unknown): void => {
  if (error instanceof AxiosError) {
    console.error(error);
    if (error.status === 401) {
      toast.warning('You are unauthorized. Please log in again.');
    } else {
      toast.error(error.message);
    }
  } else if (error instanceof Error) {
    console.error(error);
    toast.error(error.message);
  } else {
    console.error('3');
    toast.error('An unexpected error occurred');
  }
};
