import { useEffect, useState } from "react";
import { useParkContext } from "./useParkContext";
import type { Park } from "../types/Park";

export const useParkData = (parkCode?: string) => {
  const { getParkByCode } = useParkContext();
  const [park, setPark] = useState<Park | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!parkCode) return;

    const load = async () => {
      setLoading(true);
      try {
        const data = await getParkByCode(parkCode);
        setPark(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [parkCode, getParkByCode]);

  return { park, loading, error };
};
