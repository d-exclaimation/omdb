import { createContext } from "react";
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export type AuthContextValue = {
  user?: User;
  isAuthenticating: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  isAuthenticating: false,
});
