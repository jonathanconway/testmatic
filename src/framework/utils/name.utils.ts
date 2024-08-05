import { snakeCase } from "lodash";

import { sentenceCase } from "./string.utils";

export function createNameFromTitle(title: string) {
  return snakeCase(title);
}

export function createTitleFromName(title: string) {
  return sentenceCase(title);
}
