import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth/useAuth";

const AuthButton = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isLoggedIn ? "Log out" : "Log in"}
      className="hidden lg:inline bg-[var(--color-bg)] border-2 
                 border-[var(--color-primary)] px-5 py-2 rounded-full 
                 transition-all duration-300 ease-in-out hover:bg-transparent 
                 hover:text-[var(--color-bg)] hover:border-[var(--color-bg)] 
                 text-center hover:cursor-pointer"
    >
      {isLoggedIn ? "Log out" : "Log in"}
    </button>
  );
};

export default AuthButton;
