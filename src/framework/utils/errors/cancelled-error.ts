import { TestmaticError } from "./testmatic-error";

export class CancelledError extends TestmaticError {
  public name = "CancelledError";

  public constructor() {
    super("Cancelled");
  }
}

export function isCancelledError<T>(
  input: T | CancelledError
): input is CancelledError {
  return input instanceof CancelledError;
}
