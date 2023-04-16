import { useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const { user } = useContext(AuthContext);

  const isLoggedIn = useMemo(() => !!user, [user]);

  return {
    isLoggedIn,
    user,
  };
}
