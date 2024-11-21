import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(20, { message: 'Username must be at most 20 characters.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});
