type PaginatedResponse<T> = {
  data: T[];
  currentPage: number;
  pages: number;
  totalItems: number;
  pageSize: number;
  currentPageSize: number;
};
