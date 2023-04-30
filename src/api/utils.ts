import { type Arguments } from "swr";

type Query<Keys extends Arguments[], Args extends Arguments[], Returned> = {
  key: Keys;
  keys: (args: Args) => [...Keys, ...Args];
  fn: (keys: [...Keys, ...Args]) => Promise<Returned>;
};

export function q<
  Keys extends Arguments[],
  Returned,
  Args extends Arguments[] = []
>(
  keys: Keys,
  fn: (args: Args, keys: Keys) => Promise<Returned>
): Query<Keys, Args, Returned> {
  return {
    key: keys,
    keys: (args: Args) => [...keys, ...args],
    fn: (args: [...Keys, ...Args]) => fn(args.slice(keys.length) as Args, keys),
  };
}

type Mutation<Keys extends Arguments[], Arg, Returned> = {
  keys: Keys;
  fn: (keys: Keys, opts: { arg: Arg }) => Promise<Returned>;
};

export function m<Keys extends Arguments[], Returned, Arg>(
  keys: Keys,
  fn: (arg: Arg, keys: Keys) => Promise<Returned>
): Mutation<Keys, Arg, Returned> {
  return {
    keys,
    fn: (_, { arg }) => fn(arg, keys),
  };
}

export function mutation<Arg = void, Returned = any>(
  fn: (arg: Arg) => Promise<Returned>
) {
  return (_: Arguments, opts: { arg: Arg }) => {
    return fn(opts.arg);
  };
}
