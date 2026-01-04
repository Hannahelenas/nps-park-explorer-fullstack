import { useState } from "react";
import InputField from "./common/InputField";

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_URL
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch(`${backendUrl}/api/users/me/password`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update password");
        setLoading(false);
        return;
      }

      setSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="update-password-heading"
      className="mt-10 border border-[var(--color-primary)] p-6 rounded-xl w-md"
    >
      <h2 id="update-password-heading" className="text-lg font-bold mb-4">
        Update password
      </h2>

      <InputField
        id="current-password"
        label="Current password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
        autoComplete="current-password"
      />

      <InputField
        id="new-password"
        label="New password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        autoComplete="new-password"
      />

      <InputField
        id="confirm-password"
        label="Confirm new password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-[var(--color-primary)] text-white px-5 py-3 
        rounded-full"
      >
        {loading ? "Updating..." : "Update password"}
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
