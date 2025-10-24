import type { ParkingLot } from "./ParkingLot";
import type { VisitorCenter } from "./VisitorCenter";

export type SelectedLocation =
  | (VisitorCenter & { type: "visitorCenter" })
  | (ParkingLot & { type: "parkingLot" });
