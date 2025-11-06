export type UsePaginationProps = {
    currentPage: number;
    totalPages: number;
    paginationItemsToDisplay: number;
    showEllipsis?: boolean;
};

type UsePaginationReturn = {
    pages: number[];
};

export function usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
    showEllipsis = true,
}: UsePaginationProps): UsePaginationReturn {
    if (!showEllipsis || totalPages <= paginationItemsToDisplay) {
        return {
            pages: Array.from({ length: totalPages }, (_, i) => i + 1),
        };
    }

    const pages: number[] = [];
    const halfDisplay = Math.floor(paginationItemsToDisplay / 2);

    let start = Math.max(2, currentPage - halfDisplay);
    let end = Math.min(totalPages - 1, currentPage + halfDisplay);

    if (end - start + 1 < paginationItemsToDisplay - 2) {
        if (start === 2) {
            end = Math.min(totalPages - 1, start + paginationItemsToDisplay - 3);
        } else if (end === totalPages - 1) {
            start = Math.max(2, end - paginationItemsToDisplay + 3);
        }
    }

    const showLeftEllipsis = showEllipsis && start > 2;
    const showRightEllipsis = showEllipsis && end < totalPages - 1;

    pages.push(1);
    if (showLeftEllipsis) pages.push(-1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (showRightEllipsis) pages.push(-1);
    pages.push(totalPages);

    return { pages };
}
