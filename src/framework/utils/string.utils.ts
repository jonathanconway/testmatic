import flow from "lodash/flow";
import snakeCase from "lodash/snakeCase";
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
import trim from "lodash/trim";

import { isNotNil } from "./array.utils";

export function sentenceCase(input: string) {
  const [a, ...b] = startCase(input);
  return `${a.toUpperCase()}${b.join("").toLowerCase()}`;
}

export function convertToLowerCaseWithTags(input: string) {
  return convertToSentenceCaseWithTags(input).toLowerCase().trim();
}

function convertTagsToBracketedStrings(input: string) {
  let closed = false;
  while (input.includes("__")) {
    input = input.replace("__", !closed ? " (" : ") ");
    closed = !closed;
  }
  return input;
}

export function convertToSentenceCaseWithTags(input: string) {
  input = convertTagsToBracketedStrings(input);
  input = sentenceCase(input);

  return input;
}

export function convertToWrappedInQuotes(name: string): string {
  return `"${name}"`;
}

export function convertTitleToName(title: string): string {
  return title.toLowerCase().split(" ").filter(isNotNil).join("_");
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

export function convertToSnakeWithTags(input: string) {
  return input
    .toLowerCase()
    .replaceAll("  ", " ")
    .replaceAll(" ", "_")
    .replaceAll("_(", "__")
    .replaceAll(")_", "__")
    .replaceAll("(", "__")
    .replaceAll(")", "__")
    .replaceAll(/\W/g, "");
}

function removeNonAlphaNumeric(input: string) {
  return input.replace(/[^\s\p{L}\d]/gu, "");
}

function removeDoubleSpaces(input: string) {
  return input.replace(/\s+/g, " ");
}

export function convertToLowerSnakeCase(input?: string) {
  if (!input) {
    return input;
  }

  return flow([
    trim,
    toLower,
    removeNonAlphaNumeric,
    removeDoubleSpaces,
    snakeCase,
  ])(input);
}

export function trimLines(input: string) {
  input = input.split("\n").map(trim).join("\n");

  while (input.includes("\n\n\n")) {
    input = input.replaceAll("\n\n\n", "\n\n");
  }

  input = input.trim();

  return input;
}
