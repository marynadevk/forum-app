import { z } from 'zod';

export const newPostFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters.',
    })
    .max(100, { message: 'Title must be at most 100 characters.' }),
  content: z.string().min(10, {
    message: 'Content must be at least 10 characters, tell us more :).',
  }),
  image: z.string().optional() || z.string().nullable(),
});