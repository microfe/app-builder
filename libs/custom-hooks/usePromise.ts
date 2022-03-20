import { DependencyList, useEffect, useReducer } from 'react';

type UsePromiseState = 'pending' | 'resolved' | 'rejected';

type UsePromiseInput<T> = Promise<T> | (() => Promise<T>);
type UsePromiseResult<Result, Error> = [Result, Error, UsePromiseState];

const resolvePromise = <T>(promise: UsePromiseInput<T>) => {
  if (typeof promise === 'function') {
    return promise();
  }

  return promise;
};

const states: Record<string, UsePromiseState> = {
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved'
};

const defaultState = {
  error: undefined,
  result: undefined,
  state: states.pending
};

const reducer = (state, action) => {
  switch (action.type) {
    case states.pending:
      return defaultState;

    case states.resolved:
      return {
        error: undefined,
        result: action.payload,
        state: states.resolved
      };

    case states.rejected:
      return {
        error: action.payload,
        result: undefined,
        state: states.rejected
      };

    /* istanbul ignore next */
    default:
      return state;
  }
};

export const usePromise = <TResult, TError>(
  promise: UsePromiseInput<TResult>,
  dependencies: DependencyList
): UsePromiseResult<TResult, TError> => {
  const [{ error, result, state }, dispatch] = useReducer(reducer, defaultState);

  useEffect(
    () => {
      promise = resolvePromise(promise);

      if (!promise) {
        return;
      }

      let canceled = false;

      dispatch({ type: states.pending });

      promise.then(
        result => !canceled && dispatch({
          payload: result,
          type: states.resolved
        }),
        error => !canceled && dispatch({
          payload: error,
          type: states.rejected
        })
      );

      return () => {
        canceled = true;
      };
    },
    dependencies
  );

  return [result, error, state];
};