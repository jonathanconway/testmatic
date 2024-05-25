import promptSync from "prompt-sync";

import { CancelledError, isError, sentenceCase } from "../../../framework";

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
  readonly repeatIfEmpty?: boolean;
}) {
  const result = prompt(message);

  if (result === null) {
    return new CancelledError();
  }

  if (result === "" && repeatIfEmpty) {
    return promptValue({ message, repeatIfEmpty });
  }

  return result;
}

export function promptValues({
  message,
}: {
  readonly message: string;
}): readonly string[] | Error {
  console.log(message);

  const values = [];
  let index = 1;
  while (true) {
    const value = promptValue({ message: `${index}. ` });

    if (isError(value)) {
      return value;
    }

    if (value === "") {
      break;
    }

    values.push(value);
    index++;
  }

  return values;
}
