const userQueryKeys = {
    all: ['users'],
    byId: (id: string) => [...userQueryKeys.all, 'user', id],
} as const;

export default userQueryKeys;
