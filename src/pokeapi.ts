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

export type LocationAreaDetail = {
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
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

  async fetchLocationArea(areaName: string): Promise<LocationAreaDetail> {
    const url = `https://pokeapi.co/api/v2/location-area/${areaName}`;

    const cached = this.#cache.get<LocationAreaDetail>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch location area ${areaName}: ${res.statusText}`);
    }

    const data: LocationAreaDetail = await res.json();
    this.#cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch pokemon ${pokemonName}: ${res.statusText}`);
    }

    const data: Pokemon = await res.json();
    this.#cache.add(url, data);
    return data;
  }
}
