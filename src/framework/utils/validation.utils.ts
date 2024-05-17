import toString from "lodash/toString";
import {
  ZodError,
  ValidationError as ZodValidationError,
  fromZodError,
} from "zod-validation-error";

export interface ValidationError<T extends object = {}> {
  readonly message: string;
  readonly issues: readonly {
    readonly path: readonly (keyof T)[];
    readonly message: string;
  }[];
}

export function isValidationError<T extends object>(
  input: T | ValidationError<T>
): input is ValidationError<T> {
  return "message" in input && "issues" in input;
}

export function createValidationErrorFromZodError<T extends object>(
  zodError: ZodError
) {
  const message = fromZodError(zodError).toString();

  const issues = zodError.issues.map((issue) => ({
    message: issue.message,
    path: issue.path.map(toString),
  }));

  return {
    message,
    issues,
  } as T;
}
