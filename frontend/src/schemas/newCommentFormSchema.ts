import { z } from 'zod';

export const newCommentFormSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: 'Comment must be at least 1 character.',
    })
    .max(100, { message: 'Comment must be at most 100 characters.' }),
});