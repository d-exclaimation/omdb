import { useState, type FC } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user] = useState<AuthContextValue["user"]>({});
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
