import { useQuery } from "@tanstack/react-query";
import { useMemo, type FC } from "react";
import { queryKeys } from "../api/keys";
import { me } from "../api/queries/user";
import { api } from "../api/url";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isFetching } = useQuery({
    queryFn: me,
    queryKey: queryKeys.user.me,
    retry: 1,
  });

  const user = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return {
      ...data,
      image: `${api}/users/${data.id}/image?${data.timestamp}`,
    };
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticating: isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
