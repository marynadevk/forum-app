import { z } from 'zod';

//TODO rewrite this function to use fetch
const checkUsernameUnique = async (username: string) => {
  const response = await fetch(`/api/check-username?username=${username}`);
  const data = await response.json();
  return data.isUnique;
};

export const signupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: 'Username must be at least 3 characters.',
      })
      .max(20, { message: 'Username must be at most 20 characters.' })
      .refine(async (username) => await checkUsernameUnique(username), {
        message: 'Username is already taken, try another one.',
      }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    repeatPassword: z.string().min(6, {
      message: 'Repeat password must be at least 6 characters.',
    }),
    avatar: z.string().optional(),
  })
  .refine(
    (schema) => {
      return schema.repeatPassword !== schema.password;
    },
    { message: 'Passwords do not match.' }
  );
