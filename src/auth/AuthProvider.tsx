import { useEffect, useState, type FC } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextValue["user"]>();

  useEffect(() => {
    const res = localStorage.getItem("user");
    if (res) {
      setUser(JSON.parse(res));
    }
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser: (user) => {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
