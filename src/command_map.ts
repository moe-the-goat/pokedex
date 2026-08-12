import { State } from "./state.js";
import { fetchLocationAreas } from "./pokeapi.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const url = state.nextLocationAreaURL ?? undefined;
    const data = await fetchLocationAreas(url);

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
    const data = await fetchLocationAreas(state.prevLocationAreaURL);

    state.nextLocationAreaURL = data.next;
    state.prevLocationAreaURL = data.previous;

    for (const loc of data.results) {
      console.log(loc.name);
    }
  } catch (err) {
    console.error("Error fetching location areas:", err);
  }
}
