import { isError } from "lodash";

import { TestmaticError } from "./testmatic-error";

export function isTestmaticError<T>(input: T | Error): input is TestmaticError {
  return input instanceof TestmaticError;
}

export function throwIfError<T>(input: T | Error) {
  if (isError(input)) {
    throw input;
  }
  return input;
}
