import { useState, useEffect } from 'react';
import { ApiResponse } from 'app/types';

const useFetch = <T,>(endpoint: string) => {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://swapi.py4e.com/api/${endpoint}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: ApiResponse<T> = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useFetch;
