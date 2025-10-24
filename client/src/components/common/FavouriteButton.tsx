import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useFavourites } from "../../hooks/useFavourites";

type FavoriteButtonProps = {
  park: { parkCode: string; name: string; imageUrl: string };
};

const FavouriteButton = ({ park }: FavoriteButtonProps) => {
  const { toggleFavourite, isFavourite } = useFavourites();

  const favourite = isFavourite(park.parkCode);

  return (
    <button
      onClick={() => toggleFavourite(park)}
      aria-label={
        favourite ? "Remove park from favourites" : "Add park to favourites"
      }
      className="flex items-center justify-center hover:cursor-pointer"
    >
      {favourite ? (
        <IoMdHeart className="text-[var(--color-text)] text-3xl" />
      ) : (
        <IoMdHeartEmpty className="text-[var(--color-text)] text-3xl" />
      )}
    </button>
  );
};

export default FavouriteButton;
