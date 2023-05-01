import { createContext } from "react";
import { type UserInfo } from "../types/user";
type User = {
  id: number;
} & UserInfo;

export type AuthContextValue = {
  user?: User;
  isAuthenticating: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  isAuthenticating: false,
});
