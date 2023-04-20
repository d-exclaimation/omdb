export type Timestamp = string;

export type CacheControlTimestamp<T extends string[]> = {
  [K in T[number]]: Timestamp;
};

export type CacheControl<T extends string[]> = CacheControlTimestamp<T> & {
  invalidate: (key: T[number]) => void;
};
