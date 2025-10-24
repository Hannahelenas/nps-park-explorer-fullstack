import type { ParkingLot } from "../types/ParkingLot";

const apiKey = import.meta.env.VITE_NPS_API_KEY;
const apiUrl = import.meta.env.VITE_NPS_PARKING_LOTS_BASE_URL;

// Fetch ALL parking lots
export async function fetchParkingLots(): Promise<ParkingLot[]> {
  const url = new URL(apiUrl);
  url.searchParams.set("limit", "560");
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString(), {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Could not fetch parking lots");
  }

  const data = await response.json();
  return data.data as ParkingLot[];
}

// Fetch parking lots by parkCode
export async function fetchParkingLotsByPark(
  parkCode: string
): Promise<ParkingLot[]> {
  const url = new URL(apiUrl);
  url.searchParams.set("parkCode", parkCode);
  url.searchParams.set("limit", "560");
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString(), {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch parking lots for park ${parkCode}`);
  }

  const data = await response.json();
  return data.data as ParkingLot[];
}
