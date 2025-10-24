import { useEffect, useState, useCallback, type ReactNode } from "react";
import { ParkingLotContext } from "./ParkingLotContext";
import {
  fetchParkingLots,
  fetchParkingLotsByPark,
} from "../../api/parkingLots";
import type { ParkingLot } from "../../types/ParkingLot";

export const ParkingLotProvider = ({ children }: { children: ReactNode }) => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadParkingLots = async () => {
    setLoading(true);
    try {
      const data = await fetchParkingLots();
      setParkingLots(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getParkingLotsByPark = useCallback(
    async (parkCode: string): Promise<ParkingLot[]> => {
      try {
        return await fetchParkingLotsByPark(parkCode);
      } catch (err) {
        console.error(err);
        return [];
      }
    },
    []
  );

  useEffect(() => {
    loadParkingLots();
  }, []);

  return (
    <ParkingLotContext.Provider
      value={{
        parkingLots,
        error,
        loading,
        refetch: loadParkingLots,
        getParkingLotsByPark,
      }}
    >
      {children}
    </ParkingLotContext.Provider>
  );
};
