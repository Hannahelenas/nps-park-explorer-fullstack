import { useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import InputField from "./common/InputField";

const DeleteAccountForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_URL
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${backendUrl}/api/users/me`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to delete account");
        setLoading(false);
        return;
      }

      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="delete-account-heading"
      className="mt-10 border border-red-200 p-6 rounded-xl max-w-md"
    >
      <h2
        id="delete-account-heading"
        className="text-lg font-bold text-red-600 mb-4"
      >
        Delete account
      </h2>

      <p className="mb-4 text-sm">
        Please confirm your password to permanently delete your account. This
        action cannot be undone.
      </p>

      <InputField
        id="delete-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
        errorMessage={error || undefined}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-red-600 text-white px-5 py-3 border-2 rounded-full 
        disabled:opacity-60"
      >
        {loading ? "Deleting..." : "Delete account"}
      </button>
    </form>
  );
};

export default DeleteAccountForm;
