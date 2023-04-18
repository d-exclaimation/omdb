import { createContext } from "react";
import { UserInfo } from "../api/queries/user";
type User = {
  id: string;
  image: string;
} & UserInfo;

export type AuthContextValue = {
  user?: User;
  isAuthenticating: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  isAuthenticating: false,
});
