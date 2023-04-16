import { createContext } from "react";

export type AuthContextValue = {
  user?: {};
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
});
