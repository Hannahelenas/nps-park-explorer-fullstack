import { Link } from "react-router-dom";
import type { Park } from "../../types/Park";
import { getFullStateNames } from "../../utils/stateNames";

interface ParkCardProps {
  park: Park;
}

const ParkCard = ({ park }: ParkCardProps) => {
  return (
    <Link
      to={`/parks/${park.parkCode}`}
      aria-label={`Go to the page for ${park.name}`}
    >
      <article
        className="flex flex-col p-4 hover:scale-105 transition-transform 
      duration-300 ease-in-out hover:cursor-pointer hover:underline 
      hover:decoration-[var(--color-text-primary)]
      rounded-xl"
      >
        <img
          src={park.images[0]?.url}
          alt={park.images[0]?.altText}
          className="aspect-[3/2] w-full object-cover rounded-xl"
          loading="lazy"
        />
        <h2
          className="text-2xl lg:text-2xl mb-2 font-black tracking-tighter 
        mt-2"
        >
          {park.fullName}
        </h2>
        <p className="tracking-wide leading-relaxed font-serif font-bold">
          {getFullStateNames(park.states).join(", ")}
        </p>
      </article>
    </Link>
  );
};

export default ParkCard;
