import { type Arguments } from "swr";

export function query<Keys extends Arguments[] = [], Returned = any>(
  fn: (keys: Keys) => Promise<Returned>
) {
  return ([_, ...keys]: [string, ...Keys]) => fn(keys);
}

export function mutation<Arg = void, Returned = any>(
  fn: (arg: Arg) => Promise<Returned>
) {
  return (_: Arguments, opts: { arg: Arg }) => {
    return fn(opts.arg);
  };
}
