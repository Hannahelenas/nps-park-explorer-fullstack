import { useContext } from "react";
import {
  ParkingLotContext,
  type ParkingLotContextProps,
} from "../context/parkingLots/ParkingLotContext";

export function useParkingLotContext(): ParkingLotContextProps {
  const context = useContext(ParkingLotContext);
  if (!context) {
    throw new Error(
      "useParkingLotContext must be used within ParkingLotProvider"
    );
  }
  return context;
}
