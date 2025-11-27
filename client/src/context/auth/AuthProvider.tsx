import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (userData: { email: string }) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch (err) {
      console.warn("Logout failed:", err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });

        if (!res.ok) {
          setLoading(false);
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
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const contextValue: AuthContextType = { isLoggedIn, user, login, logout };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
