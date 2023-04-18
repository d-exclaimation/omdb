import { useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const { user, updateUser } = useContext(AuthContext);

  const isLoggedIn = useMemo(() => !!user, [user]);

  return {
    isLoggedIn,
    user,
    updateUser,
  };
}
