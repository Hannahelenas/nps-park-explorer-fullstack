import type { ThingToDo } from "../types/ThingToDo";

export interface ThingsToDoApiResponse {
  data: ThingToDo[];
}
const apiKey = import.meta.env.VITE_NPS_API_KEY;
const apiUrl = import.meta.env.VITE_NPS_THINGS_TO_DO_BASE_URL;

export async function fetchThingsToDoByPark(
  parkCode: string
): Promise<ThingToDo[]> {
  const url = new URL(apiUrl);

  url.searchParams.set("limit", "50");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("parkCode", parkCode);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Could not fetch things to do");
  }

  const data: ThingsToDoApiResponse = await response.json();

  return data.data;
}
