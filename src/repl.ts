import { State } from "./state.js";

export function cleanInput(text: string): string[] {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function startREPL(state: State) {
  state.readline.prompt();

  state.readline.on("line", async (line: string) => {
    const cleaned = cleanInput(line);
    if (cleaned.length === 0) {
      state.readline.prompt();
      return;
    }

    const commandName = cleaned[0];
    const command = state.commands[commandName];

    if (command) {
      try {
        await command.callback(state);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Unknown command");
    }

    state.readline.prompt();
  });
}
