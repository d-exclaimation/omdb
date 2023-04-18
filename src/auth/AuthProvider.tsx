import { useQuery } from "@tanstack/react-query";
import { useMemo, type FC } from "react";
import { me } from "../api/queries/user";
import { __API_URL__ } from "../api/url";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isFetching } = useQuery({
    queryFn: me,
    queryKey: ["me"],
    retry: 1,
  });

  const user = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return {
      ...data,
      image: `${__API_URL__}/users/${data.id}/image?${data.timestamp}`,
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
