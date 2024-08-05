import { TestmaticError } from "./testmatic-error";

/**
 * Cannot delete an entity because it is referenced by another entity.
 */
export class DeleteReferencedError extends TestmaticError {
  public name = "DeleteReferencedError";
}

export function isDeleteReferencedError<T>(
  input: T | DeleteReferencedError
): input is DeleteReferencedError {
  return input instanceof DeleteReferencedError;
}
