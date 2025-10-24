import type { ApiPark } from "../types/ApiPark";
import type { Activity, Address, Park, ParkImage, Topic } from "../types/Park";

const apiKey = import.meta.env.VITE_NPS_API_KEY;
const apiUrl = import.meta.env.VITE_NPS_PARKS_BASE_URL;

// Fetch parks
export async function fetchParks(): Promise<Park[]> {
  const url = new URL(apiUrl);
  url.searchParams.set("limit", "474");
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Could not fetch parks");
  }

  const data = await response.json();

  const allowedDesignations = [
    "national park",
    "national preserve",
    "national seashore",
  ];

  const parks: Park[] = data.data
    .filter(
      (item: ApiPark) =>
        item.designation &&
        allowedDesignations.some((designation) =>
          item.designation.toLowerCase().includes(designation)
        )
    )
    .map((item: ApiPark) => ({
      id: item.id,
      fullName: item.fullName,
      parkCode: item.parkCode,
      description: item.description,
      activities: Array.isArray(item.activities)
        ? (item.activities as Activity[])
        : [],
      topics: Array.isArray(item.topics) ? (item.topics as Topic[]) : [],
      states: item.states,
      directionsInfo: item.directionsInfo,
      images: Array.isArray(item.images) ? (item.images as ParkImage[]) : [],
      weatherInfo: item.weatherInfo,
      name: item.name,
      designation: item.designation,
      addresses: Array.isArray(item.addresses)
        ? (item.addresses as Address[])
        : [],
      operatingHours: item.operatingHours ?? [],
      contacts:
        typeof item.contacts === "object"
          ? item.contacts
          : { phoneNumbers: [], emailAddresses: [] },
      latLong: item.latLong,
    }));

  return parks;
}
// Fetch single park by parkCode
export async function fetchPark(parkCode: string): Promise<Park> {
  const url = new URL(apiUrl);
  url.searchParams.set("parkCode", parkCode);
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Could not fetch park with code ${parkCode}`);
  }

  const data = await response.json();
  const item = data.data[0];

  if (!item) {
    throw new Error(`Park not found for code ${parkCode}`);
  }

  const park: Park = {
    id: item.id,
    url: item.url,
    fullName: item.fullName,
    parkCode: item.parkCode,
    description: item.description,
    activities: Array.isArray(item.activities) ? item.activities : [],
    topics: Array.isArray(item.topics) ? item.topics : [],
    images: Array.isArray(item.images) ? item.images : [],
    states: item.states,
    directionsInfo: item.directionsInfo,
    weatherInfo: item.weatherInfo,
    name: item.name,
    designation: item.designation,
    addresses: Array.isArray(item.addresses)
      ? (item.addresses as Address[])
      : [],
    operatingHours: item.operatingHours ?? [],
    contacts:
      typeof item.contacts === "object"
        ? item.contacts
        : { phoneNumbers: [], emailAddresses: [] },
    latLong: item.latLong,
  };

  return park;
}
