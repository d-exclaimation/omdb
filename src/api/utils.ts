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

/**
 * Get a cache timestamp of the current date
 * @returns The current date in ISO format
 */
export function cachestamp() {
  return new Date().toISOString();
}
