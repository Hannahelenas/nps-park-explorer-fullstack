import React from "react";

interface PrimaryButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const PrimaryButton = ({
  type = "button",
  onClick,
  children,
  className = "",
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-[var(--color-primary)] border-2 
        border-[var(--color-primary)] px-6 py-3 rounded-full transition-all 
        duration-300 ease-in-out hover:bg-transparent 
        hover:text-[var(--color-primary)] 
        hover:border-[var(--color-primary)] hover:cursor-pointer
        text-white text-center
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
