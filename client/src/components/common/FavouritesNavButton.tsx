import { Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useFavourites } from "../../hooks/useFavourites";

const FavouritesNavButton = () => {
  const { favourites } = useFavourites();
  const hasFavourites = favourites.length > 0;

  return (
    <Link
      to="/favourites"
      aria-label="Go to favourites"
      className="relative flex items-center justify-center hover:cursor-pointer p-2"
    >
      {hasFavourites ? (
        <IoMdHeart className="text-[var(--color-secondary)] text-3xl" />
      ) : (
        <IoMdHeartEmpty className="text-[var(--color-bg)] text-3xl" />
      )}
    </Link>
  );
};

export default FavouritesNavButton;
