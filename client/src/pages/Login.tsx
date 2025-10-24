import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeading from "../components/common/PageHeading";

import {
  validateForm,
  loginSchema,
  type FormErrors,
} from "../utils/formValidation";
import LoginForm from "../components/common/LoginForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [generalMessage, setGeneralMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateForm({ email, password }, loginSchema);
    setFormErrors(errors);

    if (!isValid) {
      setGeneralMessage(
        "Your login attempt has failed. Make sure email and password are valid."
      );
      return;
    }

    // TODO Replace mock response with real API call and proper error handling
    /* try {
      const response = { success: true };
      if (!response.success) {
        setGeneralMessage("Login failed. Please try again.");
        return;
      }

      navigate("/user");
      setEmail("");
      setPassword("");
      setFormErrors({});
    } catch {
      setGeneralMessage("Server error. Please try again later.");
    } */

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // TODO implement token/session
        setEmail("");
        setPassword("");
        setFormErrors({});
        setGeneralMessage(null);
        navigate("/user");
        return;
      } // Inloggning misslyckades
      else
        setGeneralMessage(
          data.error || "Login failed. Please check your credentials."
        );
    } catch (error) {
      console.error("Fetch error:", error);
      setGeneralMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="bg-[var(--color-secondary)]">
      <section
        className="mt-10 lg:mt-15 flex flex-col mb-10 items-center 
      max-w-6xl mx-auto px-5 py-12"
      >
        <div className="w-full max-w-lg rounded-xl pb-10 bg-white shadow-sm">
          <PageHeading title="Log in" />
          <LoginForm
            email={email}
            password={password}
            formErrors={formErrors}
            generalMessage={generalMessage}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
          />
          <div className="text-center mt-4">
            <p>Don’t have an account yet?</p>
            <Link
              to="/register"
              className="font-bold underline underline-offset-2 
              text-[var(--color-primary)]"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
