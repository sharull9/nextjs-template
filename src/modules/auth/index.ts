import { usersUsingAxios, usersUsingKy } from '@/modules/auth/function';
import { makeQueryClient } from '@/providers/react-query';
import { mutationOptions, queryOptions } from '@tanstack/react-query';

const USERS_QUERY_KEY = 'users';

export const userOptions = {
    userListAxios: queryOptions({
        queryKey: [USERS_QUERY_KEY, 'axios'],
        queryFn: usersUsingAxios,
    }),
    userListKy: queryOptions({
        queryKey: [USERS_QUERY_KEY, 'ky'],
        queryFn: usersUsingKy,
    }),
    userAdd: mutationOptions({
        mutationFn: usersUsingAxios,
        onSuccess: () => {
            const queryClient = makeQueryClient();
            queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
        },
    }),
};
