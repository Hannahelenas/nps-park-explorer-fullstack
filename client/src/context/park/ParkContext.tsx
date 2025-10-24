import { createContext } from "react";
import type { Park } from "../../types/Park";

export interface ParkContextProps {
  parks: Park[];
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
  getParkByCode: (parkCode: string) => Promise<Park | null>;
}

export const ParkContext = createContext<ParkContextProps | undefined>(
  undefined
);
