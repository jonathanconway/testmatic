import promptSync from "prompt-sync";

import { sentenceCase } from "../framework/utils";

const prompt = promptSync();

export function promptFields<T extends Record<string, string>>(
  fields: readonly (keyof T)[],
  fieldLabels: Partial<Record<keyof T, string>> = {}
) {
  let values: Record<string, string> = {};

  for (const field of fields) {
    const fieldLabel = fieldLabels[field] ?? sentenceCase(field.toString());

    const value = prompt(`Please enter a value for ${fieldLabel}: `);

    values[field.toString()] = value;
  }
  return values;
}

export function promptValue({
  message,
  repeatIfEmpty,
}: {
  readonly message: string;
  repeatIfEmpty?: boolean;
}) {
  const result = prompt(message);

  if (result === null) {
    throw new Error("Cancelled.");
  }

  if (result === "" && repeatIfEmpty) {
    return promptValue({ message, repeatIfEmpty });
  }

  return result;
}

export function promptValues({ message }: { readonly message: string }) {
  console.log(message);

  const values = [];
  let index = 1;
  while (true) {
    const value = promptValue({ message: `${index}. ` });

    if (value === "") {
      break;
    }

    values.push(value);
    index++;
  }

  return values;
}
