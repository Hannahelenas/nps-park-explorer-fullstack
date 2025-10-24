import { useState, useEffect, type ReactNode } from "react";
import { FavouritesContext, type Favourite } from "./FavouritesContext";

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  // On component mount, load saved favourites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  // Save favourites in local storage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (fav: Favourite) => {
    setFavourites((prev) =>
      prev.some((f) => f.parkCode === fav.parkCode)
        ? prev.filter((f) => f.parkCode !== fav.parkCode)
        : [...prev, fav]
    );
  };

  const isFavourite = (parkCode: string) =>
    favourites.some((f) => f.parkCode === parkCode);

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
