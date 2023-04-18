import { useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import { me } from "../api/queries/user";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryFn: me,
    queryKey: ["me"],
    retry: 1,
  });

  return (
    <AuthContext.Provider
      value={{
        user: data ?? undefined,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
