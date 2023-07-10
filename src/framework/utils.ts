export function convertToSentenceCase(input: string) {
  input = input.replaceAll("_", " ");
  return input[0].toUpperCase() + input.substring(1);
}

export function convertToLowerCaseWithTokens(input: string) {
  return convertToSentenceCaseWithTokens(input).toLowerCase();
}

function convertTokensToBracketedStrings(input: string) {
  let closed = false;
  while (input.includes("__")) {
    input = input.replace("__", !closed ? " (" : ") ");
    closed = !closed;
  }
  return input;
}

export function convertToSentenceCaseWithTokens(input: string) {
  input = convertTokensToBracketedStrings(input);
  input = convertToSentenceCase(input);

  return input;
}

export function convertToWrappedInQuotes(name: string): string {
  return `"${name}"`;
}

export function convertTokenToSnakeParts(input: string) {
  input = input.replaceAll("  ", " ");

  const words = input.split(" ");
  if (words.length < 2) {
    return undefined;
  }

  const type = words.slice(-1);
  const name = words.slice(0, -1).join("_");

  return {
    type,
    name,
  };
}

export function convertToSnakeWithTokens(input: string) {
  return input
    .toLowerCase()
    .replaceAll("(", "_")
    .replaceAll(")", "_")
    .replaceAll("  ", " ")
    .replaceAll(" ", "_")
    .replaceAll(/\W/g, "");
}
