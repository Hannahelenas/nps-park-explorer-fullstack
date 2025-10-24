import { createContext } from "react";
import type { VisitorCenter } from "../../types/VisitorCenter";

export interface VisitorCenterContextProps {
  visitorCenters: VisitorCenter[];
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
  getVisitorCentersByPark: (parkCode: string) => Promise<VisitorCenter[]>;
}

export const VisitorCenterContext = createContext<
  VisitorCenterContextProps | undefined
>(undefined);
