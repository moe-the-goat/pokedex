import { createInterface, type Interface } from "node:readline";
import process from "node:process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => void | Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  pokedex: Record<string, Pokemon>;
  nextLocationAreaURL: string | null;
  prevLocationAreaURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands: Record<string, CLICommand> = {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explores a location area to find Pokémon",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempts to catch a Pokémon and add it to your Pokedex",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspects details of a caught Pokémon",
      callback: commandInspect,
    },
  };

  return {
    readline: rl,
    commands,
    pokeapi: new PokeAPI(10000),
    pokedex: {},
    nextLocationAreaURL: null,
    prevLocationAreaURL: null,
  };
}
