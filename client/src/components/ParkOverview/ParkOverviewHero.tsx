import type { Park } from "../../types/Park";

interface ParkOverviewHeroProps {
  park: Park;
}

const ParkOverviewHero = ({ park }: ParkOverviewHeroProps) => {
  return (
    <>
      <div className="relative bg-black">
        <img
          src={park.images[0]?.url}
          alt={park.images[0]?.altText}
          loading="lazy"
          className="w-full h-[30dvh] md:h-[30dvh] lg:h-[50dvh] xl:h-[64dvh] 
          object-cover"
        />
        <div
          className="absolute bottom-[-1px] left-0 w-full h-35 sm:h-40 md:h-45
        bg-gradient-to-t from-black to-transparent pointer-events-none"
        />
      </div>

      <section
        className=" bg-black py-2 md:py-4 lg:py-5"
        aria-labelledby="park-heading"
      >
        <div
          className="max-w-6xl mx-auto px-5 sm:px-10 xl:px-5 flex 
        justify-between items-start flex-col md:flex-col md:items-start 
        lg:flex-row lg:items-baseline"
        >
          <h1
            id="park-heading"
            className="text-4xl md:text-5xl xl:text-6xl font-serif 
          text-white mb-2 xl:mb-0"
          >
            {park.name}
          </h1>
          <div
            className="flex flex-col sm:flex-row justify-between 
          items-baseline gap-1 md:gap-5"
          >
            {park.designation && (
              <p
                className="text-md md:text-lg text-white font-sans 
              font-bold"
              >
                {park.designation}
              </p>
            )}
            <p className="text-md md:text-lg text-white font-sans font-bold">
              {park.states
                .split(",")
                .map((code) => code.trim())
                .join(", ")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParkOverviewHero;
