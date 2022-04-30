type WithAsyncFn<T = unknown> = () => T | Promise<T>;

type WithAsyncReturn<TData, TError> = Promise<{
  response: TData | null;
  error: TError | unknown;
}>;

export async function withAsync<TData = unknown, TError = unknown>(
  fc: WithAsyncFn<TData>,
): WithAsyncReturn<TData, TError> {
  try {
    if (typeof fc !== 'function') throw new Error('The first argument must be a function');
    const response = await fc();

    return {
      response,
      error: null,
    };
  } catch (error) {
    return {
      error: null,
      response: null,
    };
  }
}
