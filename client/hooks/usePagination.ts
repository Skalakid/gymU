/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchApi from '@/api/fetch';
import { useState, useEffect, useCallback } from 'react';

const initialData = {
  data: [],
  totalResult: 0,
  status: true,
  pageNo: 1,
  totalPages: 1,
};

const usePagination = (endpoint: string, initialSize = 10) => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [data, setData] = useState<any>(initialData.data);
  const [totalItems, setTotalItems] = useState(initialData.totalResult);
  const [pageNo, setPageNo] = useState(initialData.pageNo);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch data for a given page
  const fetchData = async (page: number, pageSize: number | null = null) => {
    if (!(page === 1 || page > pageNo)) {
      return;
    }

    const size = pageSize ?? initialSize;
    try {
      const response = await fetchApi(
        `${endpoint}?page=${page}&size=${size}`,
        'GET',
      );
      const result: PaginatedResponse<any> = await response.json();

      if (result.currentPageSize > 0) {
        setData(page === 1 ? result.data : [...data, ...result.data]);
        setTotalItems(result.totalItems);
        setPageNo(result.pageNo);
        setTotalPages(result.totalPages);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
      setInitialLoader(false);
    }
  };

  useEffect(() => {
    fetchData(pageNo, initialSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1, initialSize); // Refresh from the first page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more data
  const loadMore = () => {
    if (!loadingMore && pageNo < totalPages) {
      setLoadingMore(true);
      fetchData(pageNo + 1);
    }
  };

  return {
    data,
    totalItems,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
  };
};

export default usePagination;
