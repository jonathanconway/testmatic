export class CancelledError extends Error {
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
