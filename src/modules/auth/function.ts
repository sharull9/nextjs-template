import { api, axios } from '@/lib/api';
import { UserListResponse } from '@/modules/auth/type';

export async function usersUsingAxios() {
    const { data } = await axios.get('/users');
    return data as UserListResponse;
}

export async function usersUsingKy() {
    const data = await api.get('/users').json<UserListResponse>();
    return data;
}
