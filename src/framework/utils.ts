import { startCase } from "lodash";

export function sentenceCase(name: string): string {
  const startCased = startCase(name);
  return startCased[0].toUpperCase() + startCased.slice(1);
}

export function wrapInQuotes(name: string): string {
  return `"${name}"`;
}
