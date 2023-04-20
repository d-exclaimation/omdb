import { useMemo, type FC } from "react";
import useQuery from "swr";
import { api } from "../api/url";
import { me } from "../api/user";
import { useCacheControl } from "../common/context/cache/useCacheControl";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isValidating } = useQuery(["/me"], me);
  const { user: cachestamp } = useCacheControl();

  const user = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return {
      ...data,
      image: `${api}/users/${data.id}/image?${cachestamp}`,
    };
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
