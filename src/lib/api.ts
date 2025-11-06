import { BASE_URL } from '@/constants';
import axiosIn from 'axios';
import ky from 'ky';

export const axios = axiosIn.create({
    baseURL: BASE_URL,
    headers: {
        'x-api-key': 'random key',
    },
});

type APIError = {
    success: boolean;
    message: string;
};

export const api = ky.create({
    prefixUrl: BASE_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                const token = 'random token';
                if (token) request.headers.set('Authorization', `Bearer ${token}`);
                return request;
            },
        ],
        beforeError: [
            async (error) => {
                const { response } = error;
                if (response) {
                    const body = (await response.json()) as APIError;
                    error.name = 'APIError';
                    error.message = body.message;
                }
                return error;
            },
        ],
    },
});
