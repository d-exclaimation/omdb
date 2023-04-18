import { createContext } from "react";
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthContextValue = {
  user?: User;
  updateUser: (user: User) => void;
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  updateUser: () => {},
});
