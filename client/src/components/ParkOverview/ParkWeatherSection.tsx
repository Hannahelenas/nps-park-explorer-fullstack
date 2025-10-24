import type { Park } from "../../types/Park";

interface ParkWeatherSectionProps {
  park: Park;
}

const ParkWeatherSection = ({ park }: ParkWeatherSectionProps) => {
  return (
    <div className="bg-[var(--color-bg)]" id="park-weather-section">
      <section
        className="max-w-6xl mx-auto px-5 sm:px-10 md:px-10 xl:px-5 grid 
      grid-cols-1 lg:grid-cols-2 gap-8 mt-0 py-12"
      >
        <div>
          <img
            src={park.images[2]?.url}
            alt={park.images[2]?.altText}
            className="w-full aspect-[3/2] rounded-2xl
      object-cover"
          />
          <p className="font-serif mt-2 text-sm"> {park.images[2]?.caption}</p>
        </div>
        <div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-6">
            Weather and Climate
          </h2>
          <p className="font-serif leading-relaxed ">{park.weatherInfo}</p>
        </div>
      </section>
    </div>
  );
};

export default ParkWeatherSection;
