import { z } from 'zod';

export const signupFormSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: 'Username must be at least 3 characters.',
      })
      .max(20, { message: 'Username must be at most 20 characters.' }),
    email: z.string().email({
      message: 'Invalid email address',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    repeatPassword: z.string().min(6, {
      message: 'Repeat password must be at least 6 characters.',
    }),
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match.',
    path: ['repeatPassword'],
  });
