import { useQueryState } from 'nuqs';

export const useSearchQuery = (value: string = '') => {
    const [query, setQuery] = useQueryState('q', { defaultValue: value });
    return { query, setQuery };
};
