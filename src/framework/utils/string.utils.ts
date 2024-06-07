import { flow, snakeCase, toLower, trim } from "lodash";

import { isNotNil } from "./array.utils";

declare global {
  interface String {
    sentenceCase(this: string): string;
    convertToLowerCaseWithTags(this: string): string;
    convertTagsToBracketedStrings(this: string): string;
    convertToSentenceCaseWithTags(this: string): string;
    convertToWrappedInQuotes(this: string): string;
    convertTitleToName(this: string): string;
    convertToSnakeWithTags(this: string): string;
    removeNonAlphaNumeric(this: string): string;
    removeDoubleSpaces(this: string): string;
    convertToLowerSnakeCase(this: string): string;
    trimLines(this: string): string;
    asciiUnderline(this: string): string;
    asciiUnderlineDouble(this: string): string;
  }
}

String.prototype.sentenceCase = function (this: string) {
  return sentenceCase(this);
};

export function sentenceCase(input: string) {
  input = input.replaceAll("_", " ").split(" ").filter(isNotNil).join(" ");
  const a = input.substring(0, 1).toUpperCase();
  const b = input.substring(1).toLowerCase();
  return `${a}${b}`;
}

String.prototype.convertToLowerCaseWithTags = function (this: string) {
  return convertToLowerCaseWithTags(this);
};

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

String.prototype.convertToSentenceCaseWithTags = function (this: string) {
  return convertToSentenceCaseWithTags(this);
};

export function convertToSentenceCaseWithTags(input: string) {
  input = convertTagsToBracketedStrings(input);
  input = sentenceCase(input);

  return input;
}

String.prototype.convertToWrappedInQuotes = function (this: string): string {
  return convertToWrappedInQuotes(this);
};

export function convertToWrappedInQuotes(name: string): string {
  return `"${name}"`;
}

String.prototype.convertTitleToName = function (this: string): string {
  return convertTitleToName(this);
};

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

String.prototype.convertToSnakeWithTags = function (this: string) {
  return convertToSnakeWithTags(this);
};

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

String.prototype.removeDoubleSpaces = function (this: string) {
  return removeDoubleSpaces(this);
};

export function removeDoubleSpaces(input: string) {
  return input.replace(/\s+/g, " ");
}

String.prototype.convertToLowerSnakeCase = function (this: string) {
  return convertToLowerSnakeCase(this);
};

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

String.prototype.trimLines = function (this: string) {
  return trimLines(this);
};

export function trimLines(input: string) {
  input = input.split("\n").map(trim).join("\n");

  while (input.includes("\n\n\n")) {
    input = input.replaceAll("\n\n\n", "\n\n");
  }

  return input;
}

export function asciiUnderline(input: string) {
  return "-".repeat(input.length);
}

String.prototype.asciiUnderline = function (this: string) {
  return asciiUnderline(this);
};

export function asciiUnderlineDouble(input: string) {
  return "=".repeat(input.length);
}

String.prototype.asciiUnderlineDouble = function (this: string) {
  return asciiUnderlineDouble(this);
};

export function removeBrackets(input: string) {
  return input.replaceAll("(", "").replaceAll(")", "");
}
