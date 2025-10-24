import PaginationControls from "./PaginationControls";

interface FeaturedParksHeaderProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const FeaturedParksHeader = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: FeaturedParksHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2
        className="text-3xl lg:text-4xl mb-8 tracking-tighter font-serif 
      mt-8"
      >
        Featured parks
      </h2>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  );
};

export default FeaturedParksHeader;
