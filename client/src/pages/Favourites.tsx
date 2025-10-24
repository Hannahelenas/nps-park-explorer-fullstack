import { Link } from "react-router-dom";
import PageHeading from "../components/common/PageHeading";
import { useFavourites } from "../hooks/useFavourites";
import FavouriteButton from "../components/common/FavouriteButton";

const Favourites = () => {
  const { favourites } = useFavourites();

  return (
    <section
      className="mt-10 mb-10 lg:mt-15 flex flex-col items-center 
    max-w-6xl mx-auto px-5 py-12"
    >
      <PageHeading title="Favourites" />
      <p className="font-serif leading-relaxed text-lg">
        Your saved parks are listed here.
      </p>

      {favourites.length === 0 ? (
        <p className="mt-6 font-serif leading-relaxed ">
          You have no favourite parks yet.
        </p>
      ) : (
        <ul
          className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 
        md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {favourites.map((park) => (
            <li
              key={park.parkCode}
              className="bg-white rounded-3xl p-5 flex flex-col 
              justify-between h-full"
            >
              <Link to={`/parks/${park.parkCode}`} className="block">
                <img
                  src={park.imageUrl}
                  alt={park.name}
                  className="w-full aspect-[3/2] object-cover rounded-xl"
                />
                <h3 className="mt-4 text-xl font-black tracking-tighter">
                  {park.name}
                </h3>
              </Link>
              <div className="flex justify-end">
                <FavouriteButton park={park} />
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/parks"
        className="mt-4 bg-[var(--color-text)] border-2 
          border-[var(--color-text)] px-6 py-3 text-white rounded-full 
          transition-all 
          duration-300 ease-in-out hover:cursor-pointer hover:bg-transparent
           hover:text-black 
          hover:border-[var(--color-primary)]"
      >
        Discover parks
      </Link>
    </section>
  );
};

export default Favourites;
