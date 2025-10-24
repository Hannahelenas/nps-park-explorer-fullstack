import { useContext, useMemo } from "react";
import { ParkContext } from "../context/park/ParkContext";

const featuredParkCodes = ["acad", "zion", "yell", "romo", "grca", "yose"];

export function useFeaturedParks() {
  const context = useContext(ParkContext);

  if (!context) {
    throw new Error("useFeaturedParks must be used within a ParkProvider");
  }

  const { parks, loading, error } = context;

  // Filter featured parks
  const featuredParks = useMemo(() => {
    return parks.filter((park) =>
      featuredParkCodes.includes(park.parkCode.toLowerCase())
    );
  }, [parks]);

  return { featuredParks, loading, error };
}
