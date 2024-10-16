import { useCallback, useEffect, useState } from 'react';

interface FetchConfig extends RequestInit {
  timeout?: number;
  abortSignal?: boolean;
}

type FetchResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

function useFetch<T>(url: string, config: FetchConfig = {}): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    const { timeout = 3000, abortSignal = false, ...fetchConfig } = config;
    const controller = new AbortController();
    const timeoutRef = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      setLoading(true);
      const response = await fetch(url, {
        ...fetchConfig,
        signal: abortSignal ? controller.signal : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP ERROR! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      let result: T;

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = (await response.blob()) as unknown as T;
      }

      setData(result);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error('unexpected error'));
      }
      setData(null);
    } finally {
      setLoading(false);
    }
    clearTimeout(timeoutRef);
  }, [url, config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
}

export default useFetch;
