import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const PaginationControls = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationControlsProps) => (
  <div className="flex gap-2">
    <button
      onClick={onPrev}
      disabled={page === 0}
      aria-label="Previous parks"
      className={`p-3 flex items-center justify-center border-2 rounded-full 
        text-xl ${
          page === 0
            ? "bg-transparent cursor-not-allowed opacity-45"
            : `bg-[var(--color-text)] border-[var(--color-text)] text-white 
            hover:bg-transparent hover:text-[var(--color-text)] 
            hover:border-[var(--color-text)] hover:cursor-pointer  
            transition-all duration-300 ease-in-out `
        }`}
    >
      <IoArrowBackOutline />
    </button>
    <button
      onClick={onNext}
      disabled={page === totalPages - 1}
      aria-label="Next parks"
      className={`p-3 flex items-center justify-center border-2 rounded-full 
        text-xl ${
          page === totalPages - 1
            ? "bg-transparent  cursor-not-allowed opacity-45"
            : `bg-[var(--color-text)] border-[var(--color-text)] text-white 
            hover:bg-transparent hover:text-[var(--color-text)] 
            hover:border-[var(--color-text)] hover:cursor-pointer  
            transition-all duration-300 ease-in-out `
        }`}
    >
      <IoArrowForwardOutline />
    </button>
  </div>
);
export default PaginationControls;
