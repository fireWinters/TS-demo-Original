import { DependencyList, useCallback, useRef, useState } from 'react';
import { FunctionReturningPromise, PromiseType } from './misc/type';
import useMountedState from './useMountedState';

type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> = AsyncState<
  PromiseType<ReturnType<T>>
>;

type AsyncFnReturn<T extends FunctionReturningPromise = FunctionReturningPromise> = [
  StateFromFunctionReturningPromise<T>,
  T
];

export function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList[],
  initialState: StateFromFunctionReturningPromise<T> = { loading: false }
): AsyncFnReturn {
  const lastCallId = useRef(0);
  const isMounted = useMountedState();
  //TODO useImmer 替换 useState
  const [state, set] = useState(initialState);
  const hooksDeps = [fn, isMounted, state.loading];
  if (deps.length > 0) {
    (<typeof hooksDeps & DependencyList[]>hooksDeps).push(deps);
  }

  const callback = useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      const callId = ++lastCallId.current;
      set({ loading: true });
      return fn(...args).then(
        value => {
          isMounted() && callId === lastCallId.current && set({ value, loading: false });
          return value;
        },
        error => {
          isMounted() && callId === lastCallId.current && set({ error, loading: false });

          return error;
        }
      ) as ReturnType<T>;
    },
    [fn, isMounted]
  );
  return [state, callback as unknown as T];
}
