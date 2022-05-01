import { PENDING, ERROR, SUCCESS } from './../constants/apiStatus';
import { useState } from 'react';
import useApiStatus from './useApiStatus';

interface UseConfigApi<T> {
  initialData?: T;
}

type ApiFunction<T = unknown> = (...args: unknown[]) => T | Promise<T>;

export default function useApi<TData = unknown, TError = unknown>(fn: ApiFunction<TData>, config: UseConfigApi<TData>) {
  const { initialData } = config;
  const [data, setData] = useState<TData | undefined>(initialData);
  const [error, setError] = useState<TError | unknown>();
  const { status, setStatus, ...normalisedStatuses } = useApiStatus();

  async function exec<A>(...args: A[]) {
    try {
      setStatus(PENDING);
      const data = await fn(...args);
      console.log(data);
      setData(data);
      setStatus(SUCCESS);

      return {
        data,
        error: null,
      };
    } catch (error) {
      setError(error);
      setStatus(ERROR);
      return {
        error,
        data: null,
      };
    }
  }

  return {
    data,
    setData,
    status,
    setStatus,
    error,
    exec,
    ...normalisedStatuses,
  };
}
