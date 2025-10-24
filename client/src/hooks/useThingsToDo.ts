import { useEffect, useState } from "react";
import type { ThingToDo } from "../types/ThingToDo";
import { fetchThingsToDoByPark } from "../api/thingsToDo";

export function useThingsToDo(parkCode: string) {
  const [thingsToDo, setThingsToDo] = useState<ThingToDo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!parkCode) return;

    setIsLoading(true);
    fetchThingsToDoByPark(parkCode)
      .then((data) => {
        setThingsToDo(data);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [parkCode]);

  return { thingsToDo, isLoading, error };
}
