import { createContext } from "react";
import type { ParkingLot } from "../../types/ParkingLot";

export interface ParkingLotContextProps {
  parkingLots: ParkingLot[];
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
  getParkingLotsByPark: (parkCode: string) => Promise<ParkingLot[]>;
}

export const ParkingLotContext = createContext<
  ParkingLotContextProps | undefined
>(undefined);
