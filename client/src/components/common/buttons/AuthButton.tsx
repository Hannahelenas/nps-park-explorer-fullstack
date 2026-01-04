import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth/useAuth";

interface AuthButtonProps {
  setMenuOpen?: (open: boolean) => void;
  className?: string;
}

const AuthButton = ({ setMenuOpen, className = "" }: AuthButtonProps) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (setMenuOpen) setMenuOpen(false);
    if (isLoggedIn) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const buttonClasses = `
    bg-[var(--color-bg)] border-2 border-[var(--color-primary)]
    text-[var(--color-primary)]
    px-5 py-2 rounded-full
    transition-all duration-300 ease-in-out
    hover:bg-transparent hover:cursor-pointer hover:text-[var(--color-bg)] 
    hover:border-[var(--color-bg)]
     ${className}
  `;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isLoggedIn ? "Click to log out" : "Go to log in page"}
      className={buttonClasses}
    >
      {isLoggedIn ? "Log out" : "Log in"}
    </button>
  );
};

export default AuthButton;
