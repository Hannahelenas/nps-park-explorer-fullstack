import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";

interface LoginFormProps {
  email: string;
  password: string;
  formErrors: Record<string, string>;
  generalMessage: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({
  email,
  password,
  formErrors,
  generalMessage,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) => (
  <form onSubmit={onSubmit} className="w-full max-w-lg p-10 md:p-16 -mt-5">
    {generalMessage && (
      <div className="mb-4 flex items-center gap-2 font-bold">
        <p>{generalMessage}</p>
      </div>
    )}
    <InputField
      id="email"
      type="email"
      label="Email"
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
      autoComplete="current-password"
    />
    <div className="flex items-center justify-between mt-6">
      <PrimaryButton type="submit">Log in</PrimaryButton>
    </div>
  </form>
);

export default LoginForm;
