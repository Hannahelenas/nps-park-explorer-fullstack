import { useEffect } from "react";
import { useVisitorCenterContext } from "../../hooks/useVisitorCenterContext";
import VisitorCenterCard from "../cards/VisitorCenterCard";

interface VisitorCentersSectionProps {
  parkCode: string;
}

const VisitorCentersSection = ({ parkCode }: VisitorCentersSectionProps) => {
  const { visitorCenters, loading, error, getVisitorCentersByPark } =
    useVisitorCenterContext();

  useEffect(() => {
    getVisitorCentersByPark(parkCode);
  }, [parkCode, getVisitorCentersByPark]);

  if (loading) return <p>Loading park visitor centers...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!visitorCenters || visitorCenters.length === 0)
    return <p>No visitor centers to show for this park.</p>;

  return (
    <div
      className="bg-[var(--color-secondary)]"
      id="park-visitor-centers-section"
    >
      <section
        className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-10 xl:px-5 
      py-15"
      >
        <h2
          className="text-2xl md:text-4xl font-black tracking-tighter mb-6 
        mt-6"
        >
          Visitor Centers
        </h2>
        <ul className="grid grid-cols-1 gap-1">
          {visitorCenters.map((vc) => (
            <VisitorCenterCard key={vc.id} vc={vc} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default VisitorCentersSection;
