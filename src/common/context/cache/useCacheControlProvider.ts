import { useReducer } from "react";
import { CacheControlTimestamp, type CacheControl } from "./CacheControl";

export function useCacheControlProvider<T extends string[]>(
  initial: CacheControlTimestamp<T>
): CacheControl<T> {
  const [caches, invalidate] = useReducer(
    (
      state: CacheControlTimestamp<T>,
      action: T[number]
    ): CacheControlTimestamp<T> => {
      return {
        ...state,
        [action]: new Date().toISOString(),
      };
    },
    initial
  );

  return {
    ...caches,
    invalidate,
  };
}
