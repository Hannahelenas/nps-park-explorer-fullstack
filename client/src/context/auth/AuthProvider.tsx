import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (userData: { email: string }) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    fetch("http://localhost:3001/api/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          login({ email: data.email });
        }
      } catch (err) {
        console.log("User not authenticated yet", err);
      }
    };
    getUser();
  }, []);

  const contextValue: AuthContextType = { isLoggedIn, user, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
