import { Cache } from "./pokecache.js";

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

export class PokeAPI {
  #cache: Cache;

  constructor(cacheInterval: number = 5000) {
    this.#cache = new Cache(cacheInterval);
  }

  async fetchLocationAreas(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || "https://pokeapi.co/api/v2/location-area";

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch location areas: ${res.statusText}`);
    }

    const data: ShallowLocations = await res.json();
    this.#cache.add(url, data);
    return data;
  }
}
