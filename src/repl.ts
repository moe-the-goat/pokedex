import readline from "readline";

export function cleanInput(text: string): string[] {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    const cleaned = cleanInput(line);
    if (cleaned.length === 0) {
      rl.prompt();
      return;
    }

    console.log(`Your command was: ${cleaned[0]}`);
    rl.prompt();
  });
}
