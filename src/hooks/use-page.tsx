import { parseAsInteger, useQueryState } from 'nuqs';

export const usePage = (key = 'page') => {
    const [page, setPage] = useQueryState(key, parseAsInteger.withDefault(1));
    return { page, setPage };
};
