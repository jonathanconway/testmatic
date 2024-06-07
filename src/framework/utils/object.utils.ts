import { isNil } from "lodash";

export function getKeysWithNonNilValue(input: object) {
  return Object.entries(input)
    .filter(([, value]) => !isNil(value))
    .map(([key]) => key);
}

export function fieldOrEmpty<T>(field: string, value?: T) {
  if (value) {
    return { [field]: value };
  }
  return {};
}
