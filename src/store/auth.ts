import { AUTH_STORE } from '@/constants';
import { User } from '@/modules/auth/type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
    user: User | null;
    isAuth: boolean;
    setUser: (user: User) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuth: false,
            setUser: (user: User) => set({ user, isAuth: true }),
            logout: () => set({ user: null, isAuth: false }),
        }),
        { name: AUTH_STORE },
    ),
);
