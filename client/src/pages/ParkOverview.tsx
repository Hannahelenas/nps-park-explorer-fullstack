import { useParams } from "react-router-dom";
import { useParkData } from "../hooks/useParkData";
import ParkOverviewHero from "../components/ParkOverview/ParkOverviewHero";
import OpeningHoursSection from "../components/ParkOverview/OpeningHoursSection";
import ParkIntroSection from "../components/ParkOverview/ParkIntroSection";
import ThingsToDoSection from "../components/ParkOverview/ThingsToDoSection";
import ParkWeatherSection from "../components/ParkOverview/ParkWeatherSection";
import VisitorCentersSection from "../components/ParkOverview/VisitorCentersSection";
import ParkMapSection from "../components/ParkOverview/ParkMapSection";
import ParkOverviewNavSection from "../components/ParkOverview/ParkOverviewNavSection";

const ParkOverview = () => {
  const { parkCode } = useParams<{ parkCode: string }>();
  const { park, loading, error } = useParkData(parkCode);

  if (loading) {
    return (
      <div
        className="h-[40dvh] md:h-[50dvh] lg:h-[50dvh] xl:h-[80dvh] flex 
      justify-center items-center"
      >
        <p className="text-lg font-semibold flex items-center gap-2">
          <span
            className="animate-spin w-4 h-4 border-2 border-t-transparent
           border-black rounded-full"
          ></span>
          Loading park...
        </p>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!park) return <div>No park found.</div>;

  return (
    <section className="mt-0 relative">
      {/* Hero section */}
      {park && <ParkOverviewHero park={park} />}

      {/* Top navigation and small weather */}
      {park && <ParkOverviewNavSection park={park} />}

      {/* Park intro section */}
      {park && <ParkIntroSection park={park} />}

      {/* Weather and climate section */}
      {park && <ParkWeatherSection park={park} />}

      {/* Things to do section */}
      {park && parkCode && <ThingsToDoSection parkCode={parkCode} />}

      {/* Map section */}
      {parkCode && (
        <ParkMapSection
          directionsInfo={park.directionsInfo}
          parkCode={parkCode}
        />
      )}

      {/* Visitor centers section */}
      {parkCode && <VisitorCentersSection parkCode={parkCode} />}

      {/* Opening hours section */}
      {park && <OpeningHoursSection park={park} />}
    </section>
  );
};

export default ParkOverview;
