import { type Arguments } from "swr";

type Query<Keys extends Arguments[], Params extends Arguments[], Returned> = {
  key: Keys;
  keys: (params: Params) => [...Keys, ...Params];
  fn: (keys: [...Keys, ...Params]) => Promise<Returned>;
};

export function query<
  Keys extends Arguments[],
  Returned,
  Params extends Arguments[] = []
>(
  keys: Keys,
  fn: (params: Params, keys: Keys) => Promise<Returned>
): Query<Keys, Params, Returned> {
  return {
    key: keys,
    keys: (params: Params) => [...keys, ...params],
    fn: (params: [...Keys, ...Params]) =>
      fn(params.slice(keys.length) as Params, keys),
  };
}

type Mutation<Keys extends Arguments[], Arg, Returned> = {
  keys: Keys;
  fn: (keys: Keys, opts: { arg: Arg }) => Promise<Returned>;
};

export function mutation<Keys extends Arguments[], Returned, Arg>(
  keys: Keys,
  fn: (arg: Arg, keys: Keys) => Promise<Returned>
): Mutation<Keys, Arg, Returned> {
  return {
    keys,
    fn: (_, { arg }) => fn(arg, keys),
  };
}
