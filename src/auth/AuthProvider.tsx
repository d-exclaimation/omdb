import { useMemo, type FC } from "react";
import useQuery from "swr";
import { me } from "../api/user";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isValidating } = useQuery(me.key, me.fn, {
    keepPreviousData: true,
  });

  const user = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return data;
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticating: isValidating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
