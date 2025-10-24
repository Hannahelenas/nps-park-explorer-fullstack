// Parse lat and long coordinates
export function parseLatLong(
  latLong: string
): { lat: string; long: string } | null {
  if (!latLong) return null;

  const [latPart, longPart] = latLong.split(",");
  if (!latPart || !longPart) return null;

  const lat = latPart.replace("lat:", "").trim();
  const long = longPart.replace("long:", "").trim();

  if (!lat || !long) return null;

  return { lat, long };
}
