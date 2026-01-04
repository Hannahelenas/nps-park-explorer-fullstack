import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../context/auth/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}
