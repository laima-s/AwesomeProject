import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '../types';

const fetcher = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useFetch = <T extends object>(endpoint: string): UseQueryResult<ApiResponse<T>, Error> => {
  const url = `https://swapi.py4e.com/api/${endpoint}/`;
  return useQuery<ApiResponse<T>, Error>({
    queryKey: [endpoint],
    queryFn: () => fetcher<T>(url),
  });
};

export default useFetch;
