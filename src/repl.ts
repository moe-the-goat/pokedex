import * as readline from "node:readline";
import process from "node:process";
import { getCommands } from "./command.js";

export function cleanInput(text: string): string[] {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function startREPL() {
  const commands = getCommands();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line: string) => {
    const cleaned = cleanInput(line);
    if (cleaned.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = cleaned[0];
    const command = commands[commandName];

    if (command) {
      try {
        command.callback(commands);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
