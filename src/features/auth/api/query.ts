import { usersUsingAxios, usersUsingKy } from '@/features/auth/api/function';
import userQueryKeys from '@/features/auth/api/keys';
import { makeQueryClient } from '@/providers/react-query';
import { mutationOptions, queryOptions } from '@tanstack/react-query';

export const userOptions = {
    userListAxios: queryOptions({
        queryKey: [...userQueryKeys.all, 'axios'],
        queryFn: usersUsingAxios,
    }),
    userListKy: queryOptions({
        queryKey: [...userQueryKeys.all, 'ky'],
        queryFn: usersUsingKy,
    }),
    userAdd: mutationOptions({
        mutationFn: usersUsingAxios,
        onSuccess: () => {
            const queryClient = makeQueryClient();
            queryClient.invalidateQueries({ queryKey: [...userQueryKeys.all] });
        },
    }),
};
