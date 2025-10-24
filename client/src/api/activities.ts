import type { Activity } from "../types/Activity";

const apiKey = import.meta.env.VITE_NPS_API_KEY;
const apiUrl = import.meta.env.VITE_NPS_ACTIVITIES_BASE_URL;

// Allowed activities
const allowedActivities = [
  "Camping",
  "Fishing",
  "Hiking",
  "Wildlife Watching",
  "Astronomy",
];

// Image map
const imageMap: Record<string, string> = {
  Camping: "/camping-patrick-hendry-Vtq3I6fey3I-unsplash.jpg",
  Fishing: "/fishing-greysen-johnson-cZVzzFadTMc-unsplash.jpg",
  Hiking: "/hiking-toomas-tartes-Yizrl9N_eDA-unsplash.jpg",
  "Wildlife Watching":
    "/wildlife-watching-zdenek-machacek-PK94wCeXdjA-unsplash.jpg",
  Astronomy: "/astronomy-jeremy-thomas-pq2DJBntZW0-unsplash.jpg",
};

// Fetch ALL activities
export async function fetchActivities(): Promise<Activity[]> {
  const url = new URL(apiUrl);
  url.searchParams.set("api_key", apiKey);

  const response = await fetch(url.toString(), {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Could not fetch activities");
  }

  const data = await response.json();

  const activities: Activity[] = data.data
    .filter((act: Activity) => allowedActivities.includes(act.name))
    .map((act: Activity) => ({
      ...act,
      imageUrl: imageMap[act.name],
    }));

  return activities;
}
