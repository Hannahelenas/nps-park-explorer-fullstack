import { useEffect, useState, useCallback, type ReactNode } from "react";
import { ParkContext } from "./ParkContext";
import { fetchPark, fetchParks } from "../../api/parks";
import type { Park } from "../../types/Park";

export const ParkProvider = ({ children }: { children: ReactNode }) => {
  const [parks, setParks] = useState<Park[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadParks = async () => {
    setLoading(true);
    try {
      const data = await fetchParks();
      setParks(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getParkByCode = useCallback(
    async (parkCode: string): Promise<Park | null> => {
      try {
        const data = await fetchPark(parkCode);
        return data;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    loadParks();
  }, []);

  return (
    <ParkContext.Provider
      value={{
        parks,
        error,
        loading,
        refetch: loadParks,
        getParkByCode,
      }}
    >
      {children}
    </ParkContext.Provider>
  );
};
