import { type Arguments } from "swr";

export function query<Keys extends Arguments = Arguments, Returned = any>(
  fn: (keys: Keys) => Promise<Returned>
) {
  return fn;
}

export function mutation<Arg, Returned = any>(
  fn: (arg: Arg) => Promise<Returned>
) {
  return (_: Arguments, opts: { arg: Arg }) => {
    return fn(opts.arg);
  };
}
