import { useState, useEffect, useCallback } from "react";
import { useFeaturedParks } from "../../hooks/useFeaturedParks";
import FeaturedParksList from "./FeaturedParksList";
import FeaturedParksHeader from "./FeaturedParksHeader";

const FeaturedParksSection = () => {
  const { featuredParks, loading, error } = useFeaturedParks();
  const [page, setPage] = useState(0);
  const [parksPerPage, setParksPerPage] = useState(1);

  // Update number of parks to display depending on screensize
  useEffect(() => {
    const updateParksPerPage = () => {
      if (window.innerWidth >= 1024) {
        setParksPerPage(3);
      } else if (window.innerWidth >= 768) {
        setParksPerPage(2);
      } else {
        setParksPerPage(1);
      }
    };

    updateParksPerPage();
    window.addEventListener("resize", updateParksPerPage);
    return () => window.removeEventListener("resize", updateParksPerPage);
  }, []);

  const totalPages = Math.ceil(featuredParks.length / parksPerPage);

  const handlePrev = useCallback(
    () => setPage((prev) => Math.max(prev - 1, 0)),
    []
  );

  const handleNext = useCallback(
    () => setPage((prev) => Math.min(prev + 1, totalPages - 1)),
    [totalPages]
  );

  // Listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  if (loading)
    return <p className="text-center mt-4">Loading featured parks...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = page * parksPerPage;
  const visibleParks = featuredParks.slice(
    startIndex,
    startIndex + parksPerPage
  );

  return (
    <section className="max-w-6xl px-5 sm:px-10 xl:px-0 mx-auto mt-10 mb-10">
      <FeaturedParksHeader
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <FeaturedParksList parks={visibleParks} />
    </section>
  );
};

export default FeaturedParksSection;
