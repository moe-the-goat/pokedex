import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a location area name");
    return;
  }

  const areaName = args[0];
  console.log(`Exploring ${areaName}...`);

  try {
    const locationArea = await state.pokeapi.fetchLocationArea(areaName);
    console.log("Found Pokemon:");
    for (const encounter of locationArea.pokemon_encounters) {
      console.log(` - ${encounter.pokemon.name}`);
    }
  } catch (err) {
    console.error(`Error exploring area ${areaName}:`, err);
  }
}
