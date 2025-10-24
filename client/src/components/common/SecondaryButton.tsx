import type { ButtonHTMLAttributes } from "react";
import type { FC } from "react";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="bg-[var-(--color-bg)] border-2 border-[var(--color-text)] 
      text-[var(--color-text)] px-6 py-3 rounded-full 
      font-medium tracking-wide transition-all duration-300 
      ease-in-out hover:cursor-pointer hover:bg-[var(--color-text)]
       hover:text-white hover:border-[var(--color-text)]"
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
