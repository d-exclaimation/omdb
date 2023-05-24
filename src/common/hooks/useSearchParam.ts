import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchParam(key: string) {
  const [params] = useSearchParams();
  return useMemo(() => params.get(key), [key]);
}
