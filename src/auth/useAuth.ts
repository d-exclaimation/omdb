import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const { user, isLoading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const isLoggedIn = useMemo(() => !!user, [user]);

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(["me"]);
  }, []);

  return {
    isLoggedIn,
    isLoading,
    user,
    invalidate,
  };
}
