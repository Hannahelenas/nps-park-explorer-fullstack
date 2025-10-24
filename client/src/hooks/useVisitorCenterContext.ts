import { useContext } from "react";
import {
  VisitorCenterContext,
  type VisitorCenterContextProps,
} from "../context/visitorcenters/VisitorCenterContext";

export function useVisitorCenterContext(): VisitorCenterContextProps {
  const context = useContext(VisitorCenterContext);
  if (!context) {
    throw new Error(
      "useVisitorCenterContext must be used within VisitorCenterProvider"
    );
  }
  return context;
}
