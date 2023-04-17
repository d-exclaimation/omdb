import { createContext } from "react";

export type AuthContextValue = {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
});
