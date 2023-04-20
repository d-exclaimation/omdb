import { useCallback, useContext, useMemo } from "react";
import { useSWRConfig } from "swr";
import { prefixed } from "../api/keys";
import { useCacheControl } from "../common/context/cache/useCacheControl";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const cacheControl = useCacheControl();
  const { user, isAuthenticating } = useContext(AuthContext);
  const { mutate } = useSWRConfig();

  const isLoggedIn = useMemo(() => !!user, [user]);

  const invalidate = useCallback(() => {
    cacheControl.invalidate("user");
    mutate(prefixed("/me"));
  }, []);

  return {
    isLoggedIn,
    isAuthenticating,
    user,
    invalidate,
  };
}
