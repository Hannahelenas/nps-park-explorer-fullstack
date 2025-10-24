import { useState, useCallback, type ReactNode } from "react";
import { VisitorCenterContext } from "./VisitorCenterContext";
import {
  fetchVisitorCenters,
  fetchVisitorCentersByPark,
} from "../../api/visitorCenters";
import type { VisitorCenter } from "../../types/VisitorCenter";

export const VisitorCenterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [visitorCenters, setVisitorCenters] = useState<VisitorCenter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // All visitor centers
  const loadVisitorCenters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchVisitorCenters();
      setVisitorCenters(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching all visitor centers:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Visitor centers by park
  const getVisitorCentersByPark = useCallback(
    async (parkCode: string): Promise<VisitorCenter[]> => {
      setLoading(true);
      try {
        const data = await fetchVisitorCentersByPark(parkCode);
        setVisitorCenters(data);
        setError(null);
        return data;
      } catch (err) {
        console.error("Error fetching visitor centers by park:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <VisitorCenterContext.Provider
      value={{
        visitorCenters,
        error,
        loading,
        refetch: loadVisitorCenters,
        getVisitorCentersByPark,
      }}
    >
      {children}
    </VisitorCenterContext.Provider>
  );
};
