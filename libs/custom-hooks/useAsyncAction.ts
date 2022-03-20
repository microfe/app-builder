import React from 'react';

type UseAsyncResult<TParams, TResult, TException> = [(p: TParams) => void, boolean, TResult | undefined, TException | undefined];

export const useAsyncAction = <TParams, TResult, TException = Record<string, unknown>>(asyncAction: (p: TParams) => Promise<TResult>): UseAsyncResult<TParams, TResult, TException> => {
  const _theHook = React.useRef({
    unmounted: false
  });

  const [result, setResult] = React.useState<TResult | undefined>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<TException | undefined>();

  const request = React.useCallback(
    (params: TParams) => {
      setLoading(true);
      asyncAction(params)
        .then((_response) => {
          if (_theHook.current.unmounted) {
            return;
          }

          setResult(_response);
        })
        .catch(error => {
          if (_theHook.current.unmounted) {
            return;
          }
          setError(error);
        })
        .finally(() => {
          if (_theHook.current.unmounted) {
            return;
          }

          setLoading(false);
        });
      
    },
    [asyncAction]
  );

  React.useEffect(
    () => {
      const currentHookData = _theHook.current;

      return () => {
        currentHookData.unmounted = true;
      };
    },
    []
  );

  return [request, loading, result, error];
};