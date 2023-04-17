import { useCallback, useState } from "react";

export function useToggle(initial: boolean = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const close = useCallback(() => setValue(false), []);
  const open = useCallback(() => setValue(true), []);
  return [value, { toggle, close, open }] as const;
}
