import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import { Link } from "react-router-dom";

interface RegisterFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  formErrors: Record<string, string>;
  generalMessage: string | null;
  isSuccess: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm = ({
  email,
  password,
  confirmPassword,
  formErrors,
  generalMessage,
  isSuccess,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: RegisterFormProps) => (
  <form onSubmit={onSubmit} className="w-full max-w-lg -mt-5 p-16">
    {generalMessage && (
      <div className="mb-4 flex items-center gap-2 font-bold">
        <p>{generalMessage}</p>
        {isSuccess && (
          <Link to="/login" className="underline">
            Log in
          </Link>
        )}
      </div>
    )}
    <InputField
      id="email"
      label="Email"
      type="email"
      value={email}
      onChange={onEmailChange}
      errorMessage={formErrors.email}
      required
      autoComplete="email"
    />
    <InputField
      id="password"
      label="Password"
      type="password"
      value={password}
      onChange={onPasswordChange}
      errorMessage={formErrors.password}
      required
      autoComplete="new-password"
    />
    <InputField
      id="confirmPassword"
      label="Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={onConfirmPasswordChange}
      errorMessage={formErrors.confirmPassword}
      required
      autoComplete="new-password"
    />

    <div className="flex items-center justify-between mt-6">
      <PrimaryButton type="submit">Create account</PrimaryButton>
    </div>
  </form>
);

export default RegisterForm;
