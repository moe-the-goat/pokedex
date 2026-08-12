import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const url = state.nextLocationAreaURL ?? undefined;
    const data = await state.pokeapi.fetchLocationAreas(url);

    state.nextLocationAreaURL = data.next;
    state.prevLocationAreaURL = data.previous;

    for (const loc of data.results) {
      console.log(loc.name);
    }
  } catch (err) {
    console.error("Error fetching location areas:", err);
  }
}

export async function commandMapb(state: State): Promise<void> {
  if (!state.prevLocationAreaURL) {
    console.log("you're on the first page");
    return;
  }

  try {
    const data = await state.pokeapi.fetchLocationAreas(state.prevLocationAreaURL);

    state.nextLocationAreaURL = data.next;
    state.prevLocationAreaURL = data.previous;

    for (const loc of data.results) {
      console.log(loc.name);
    }
  } catch (err) {
    console.error("Error fetching location areas:", err);
  }
}
