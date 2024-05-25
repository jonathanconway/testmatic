import { ValidationError, isValidationError } from "../../utils";
import { Link } from "../link";

export interface Tag {
  readonly name: string;
  readonly type?: string;
  readonly title: string;
  readonly description?: string;
  readonly links: readonly Link[];
}

export function isTag(tagOrError: Tag | ValidationError): tagOrError is Tag {
  return !isValidationError(tagOrError);
}
