import z from 'zod';

export const userAddSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
});
