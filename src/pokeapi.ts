export type LocationArea = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: LocationArea[];
};

export async function fetchLocationAreas(pageURL?: string): Promise<ShallowLocations> {
  const url = pageURL || "https://pokeapi.co/api/v2/location-area";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch location areas: ${res.statusText}`);
  }
  return res.json();
}
