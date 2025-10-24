import { createContext } from "react";

export type Favourite = {
  parkCode: string;
  name: string;
  imageUrl: string;
};

export type FavouritesContextType = {
  favourites: Favourite[];
  toggleFavourite: (fav: Favourite) => void;
  isFavourite: (parkCode: string) => boolean;
};

export const FavouritesContext = createContext<
  FavouritesContextType | undefined
>(undefined);
