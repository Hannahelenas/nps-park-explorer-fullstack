import type { VisitorCenter } from "../types/VisitorCenter";

const apiKey = import.meta.env.VITE_NPS_API_KEY;
const apiUrl = import.meta.env.VITE_NPS_VISITORCENTERS_BASE_URL;

// Fetch ALL visitor centers
export async function fetchVisitorCenters(): Promise<VisitorCenter[]> {
  const url = new URL(apiUrl);
  url.searchParams.set("limit", "600");
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString(), {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Could not fetch visitor centers");
  }

  const data = await response.json();
  return data.data as VisitorCenter[];
}

// Fetch visitor centers by parkCode
export async function fetchVisitorCentersByPark(
  parkCode: string
): Promise<VisitorCenter[]> {
  const url = new URL(apiUrl);
  url.searchParams.set("parkCode", parkCode);
  url.searchParams.set("limit", "600");
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString(), {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch visitor centers for park ${parkCode}`);
  }

  const data = await response.json();
  return data.data as VisitorCenter[];
}
