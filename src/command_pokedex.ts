import { State } from "./state.js";

export function commandPokedex(state: State): void {
  const pokemonNames = Object.keys(state.pokedex);

  if (pokemonNames.length === 0) {
    console.log("You have not caught any Pokemon yet.");
    return;
  }

  console.log("Your Pokedex:");
  for (const name of pokemonNames) {
    console.log(` - ${name}`);
  }
}
