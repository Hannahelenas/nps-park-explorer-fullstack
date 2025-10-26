import { createContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (userData: { email: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});
