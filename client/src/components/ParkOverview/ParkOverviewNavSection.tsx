import { useWeather } from "../../hooks/useWeather";
import type { Park } from "../../types/Park";
import { parseLatLong } from "../../utils/parseCoordinates";
import FavouriteButton from "../common/FavouriteButton";
import SmallWeatherDisplay from "../SmallWeatherDisplay";

const anchorLinks = [
  { name: "Intro", to: "#park-intro-section" },
  { name: "Weather", to: "#park-weather-section" },
  { name: "Map", to: "#park-map-section" },
  { name: "Visitor Centers", to: "#park-visitor-centers-section" },
  { name: "Opening hours", to: "#park-opeing-hours-section" },
];

interface ParkOverviewNavSectionProps {
  park: Park;
}

const ParkOverviewNavSection = ({ park }: ParkOverviewNavSectionProps) => {
  // Coordinates for weather display
  const coordinates = park.latLong ? parseLatLong(park.latLong) : null;
  const { weather, loading: weatherLoading } = useWeather(
    coordinates?.lat,
    coordinates?.long
  );

  return (
    <section
      className="max-w-6xl mx-auto px-5 sm:px-10 md:px-10 xl:px-5 flex 
      flex-col md:flex-row justify-between sm:items-center"
    >
      {/* Anchor navigation list */}
      <ul
        className="flex flex-row flex-wrap font-serif font-medium 
        items-start gap-4 md:gap-6 py-4 lg:py-5 xl:py-6"
      >
        {anchorLinks.map((link) => (
          <li
            key={link.to}
            className="hover:underline hover:underline-offset-2"
          >
            {" "}
            <a href={link.to}> {link.name}</a>
          </li>
        ))}
      </ul>

      {/* Weather display & favourite button */}
      <div
        className="flex flex-row items-center justify-end gap-6 pb-4 
      sm:pb-0"
      >
        {!weatherLoading && weather && (
          <SmallWeatherDisplay temp={weather.temp} main={weather.main} />
        )}

        {park.parkCode && park.fullName && (
          <FavouriteButton
            park={{
              parkCode: park.parkCode,
              name: park.fullName,
              imageUrl: park.images[0]?.url,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ParkOverviewNavSection;
