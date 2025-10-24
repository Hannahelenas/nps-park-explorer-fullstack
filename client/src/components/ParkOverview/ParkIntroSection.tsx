import type { Park } from "../../types/Park";

interface ParkIntroSectionProps {
  park: Park;
}

const ParkIntroSection = ({ park }: ParkIntroSectionProps) => {
  return (
    <div className="bg-[var(--color-secondary)] " id="park-intro-section">
      <section
        className="max-w-6xl mx-auto px-5 sm:px-10 md:px-10 lg:px-10 xl:px-5 
        grid 
      grid-cols-1 lg:grid-cols-2 gap-8 mt-0 py-12 "
      >
        <div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-6">
            Introduction
          </h2>
          <p className="mt-2 font-serif leading-relaxed">{park.description}</p>
        </div>

        {/*Image and text container*/}
        <div>
          <img
            src={park.images[1]?.url}
            alt={park.images[1]?.altText}
            className="w-full aspect-[3/2] rounded-2xl
      object-cover"
          />
          <p className="font-serif mt-2 text-sm"> {park.images[1]?.caption}</p>
        </div>
      </section>
    </div>
  );
};

export default ParkIntroSection;
