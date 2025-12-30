import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const backendUrl = import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_URL
    : "";

  const login = (userData: { email: string }) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
        setUser(null);
      } else {
        console.warn("Logout failed on server");
      }
    } catch (err) {
      console.warn("Logout failed:", err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/me`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          setIsLoggedIn(false);
          setUser(null);
          return;
        }

        const data = await res.json();
        if (data?.email) {
          login({ email: data.email });
        }
      } catch (err) {
        console.warn("Auth check failed:", err);
      }
    };

    getUser();
  }, [backendUrl]);

  const contextValue: AuthContextType = { isLoggedIn, user, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
