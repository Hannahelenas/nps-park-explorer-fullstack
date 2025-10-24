import { Link } from "react-router-dom";
import { getFullStateNames } from "../../utils/stateNames";
import type { Park } from "../../types/Park";

interface FeaturedParksListProps {
  parks: Park[];
}

const FeaturedParksList = ({ parks }: FeaturedParksListProps) => {
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parks.map((park) => (
          <li key={park.id}>
            <Link
              to={`/parks/${park.parkCode}`}
              aria-label={`Go to the page for ${park.name}`}
            >
              <img
                src={park.images[0]?.url}
                alt={park.images[0]?.altText || park.name}
                className="aspect-[4/3] w-full object-cover rounded-2xl"
                loading="lazy"
              />
              <h3
                className="text-xl lg:text-2xl mb-2 font-black tracking-tighter 
            mt-2"
              >
                {park.name}
              </h3>
              <p className="tracking-wide leading-relaxed font-serif font-bold">
                {getFullStateNames(park.states).join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FeaturedParksList;
