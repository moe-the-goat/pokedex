import { createInterface, type Interface } from "node:readline";
import process from "node:process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void | Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
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
  };

  return {
    readline: rl,
    commands,
    nextLocationAreaURL: null,
    prevLocationAreaURL: null,
  };
}
