import { useContext } from "react";
import {
  ParkContext,
  type ParkContextProps,
} from "../context/park/ParkContext";

export function useParkContext(): ParkContextProps {
  const context = useContext(ParkContext);
  if (!context) {
    throw new Error("useParkContext must be used in ParkProvider");
  }
  return context;
}
