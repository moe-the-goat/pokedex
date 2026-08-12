import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a pokemon name");
    return;
  }

  const pokemonName = args[0].toLowerCase();
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
    
    // Higher base_experience = harder to catch
    const catchChance = Math.max(0.1, 1 - pokemon.base_experience / 300);
    const rolled = Math.random();

    if (rolled <= catchChance) {
      console.log(`${pokemonName} was caught!`);
      state.pokedex[pokemonName] = pokemon;
    } else {
      console.log(`${pokemonName} escaped!`);
    }
  } catch (err) {
    console.error(`Error fetching pokemon ${pokemonName}:`, err);
  }
}
