import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useMemo } from "react";
import { queryKeys } from "../api/keys";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const { user, isAuthenticating } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const isLoggedIn = useMemo(() => !!user, [user]);

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) => {
        return queryKey[0] === queryKeys.user.prefix;
      },
    });
  }, []);

  return {
    isLoggedIn,
    isAuthenticating,
    user,
    invalidate,
  };
}
