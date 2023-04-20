import { useContext } from "react";
import { GlobalContext } from "../global/GlobalContext";

export function useCacheControl() {
  const { cache } = useContext(GlobalContext);
  return cache;
}
