import { type Arguments } from "swr";

export function prefixed(by: string) {
  return (keys?: Arguments) => {
    if (Array.isArray(keys)) {
      return keys[0] === by;
    }
    if (typeof keys === "string") {
      return keys === by;
    }
    return false;
  };
}

export function included(by: string) {
  return (keys?: Arguments) => {
    if (Array.isArray(keys)) {
      return keys.includes(by);
    }
    if (typeof keys === "string") {
      return keys === by;
    }
    return false;
  };
}

export function when(condition: boolean, keys: Arguments) {
  return condition ? keys : null;
}
