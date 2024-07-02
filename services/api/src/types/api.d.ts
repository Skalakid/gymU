type PaginatedResponse<T> = {
  currentPage: number;
  pages: number;
  totalItems: number;
  pageSize: number;
  currentPageSize: number;
  data: T;
};

export type { PaginatedResponse };
