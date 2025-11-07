import { UserListResponse } from '@/features/auth/type';
import { api, axios } from '@/lib/api';

export async function usersUsingAxios() {
    const { data } = await axios.get('/users');
    return data as UserListResponse;
}

export async function usersUsingKy() {
    const data = await api.get('/users').json<UserListResponse>();
    return data;
}
