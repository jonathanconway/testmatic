import isNil from "lodash/isNil";

export function getKeysWithNonNilValue(input: object) {
  return Object.entries(input)
    .filter(([, value]) => !isNil(value))
    .map(([key]) => key);
}
