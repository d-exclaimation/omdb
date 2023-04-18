import { useCallback, useContext, useMemo } from "react";
import { useSWRConfig } from "swr";
import { prefixed } from "../api/keys";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const { user, isAuthenticating } = useContext(AuthContext);
  const { mutate } = useSWRConfig();

  const isLoggedIn = useMemo(() => !!user, [user]);

  const invalidate = useCallback(() => {
    mutate(prefixed("/me"));
  }, []);

  return {
    isLoggedIn,
    isAuthenticating,
    user,
    invalidate,
  };
}
