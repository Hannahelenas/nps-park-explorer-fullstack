import { useState } from "react";
import PageHeading from "../components/common/PageHeading";
import RegisterForm from "../components/common/RegisterForm";
import { Link } from "react-router-dom";
import {
  validateForm,
  registerSchema,
  type FormErrors,
} from "../utils/formValidation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [generalMessage, setGeneralMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateForm(
      { email, password, confirmPassword },
      registerSchema
    );
    setFormErrors(errors);

    if (!isValid) {
      setGeneralMessage(
        `Your register attempt has failed. Make sure email and password are 
        valid.`
      );
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        setGeneralMessage("Account created successfully!");
        setIsSuccess(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFormErrors({});
      } else {
        const errorData = await response.json();
        setGeneralMessage(
          errorData.error || "Registration failed. Please try again."
        );
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setGeneralMessage("Something went wrong. Please try again later.");
      setIsSuccess(false);
    }
  };

  return (
    <section
      className="mt-10 lg:mt-15 flex flex-col mb-10 items-center 
    max-w-6xl mx-auto px-5 py-12"
    >
      <div
        className="w-full max-w-lg rounded-b-xl flex flex-col rounded-t-2xl 
      pb-10 bg-white shadow-sm"
      >
        <PageHeading title="Create Account" />
        <RegisterForm
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          formErrors={formErrors}
          generalMessage={generalMessage}
          isSuccess={isSuccess}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          onSubmit={handleSubmit}
        />
        <div className="text-center mt-4">
          <p>Already have an account?</p>
          <Link
            to="/login"
            className="font-bold underline underline-offset-2 
            text-[var(--color-primary)]"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
