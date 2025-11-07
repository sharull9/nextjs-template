import { userAddSchema } from '@/features/auth/schema';
import z from 'zod';

export type UserAddSchema = z.infer<typeof userAddSchema>;

export type UserListResponse = {
    success: boolean;
    message: string;
    data: User[];
};

export type User = {
    id: number;
} & UserAddSchema;
