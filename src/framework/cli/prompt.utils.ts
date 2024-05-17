import promptSync from "prompt-sync";

import { sentenceCase } from "../utils";

const prompt = promptSync();

function getDidUserCancel(value: string | null) {
  return value === null;
}

export function promptFields<T extends Record<string, string>>(
  fields: readonly (keyof T)[],
  fieldLabels: Partial<Record<keyof T, string>> = {}
) {
  let values: Record<string, string> = {};

  for (const field of fields) {
    const fieldLabel = fieldLabels[field] ?? sentenceCase(field.toString());

    const value = prompt(`Please enter a value for ${fieldLabel}: `);

    if (getDidUserCancel(value)) {
      return values;
    }

    values[field.toString()] = value;
  }
  return values;
}
