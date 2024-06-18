
type PaginatedResponse = {
    currentPage: number;
    pages: number;
    totalItems: number;
    pageSize: number;
    currentPageSize: number;
    data: any[];
};


export type { PaginatedResponse };
