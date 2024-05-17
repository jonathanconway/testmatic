import snakeCase from "lodash/snakeCase";
import { array, object, string } from "zod";

import {
  ValidationError,
  createValidationErrorFromZodError,
  sentenceCase,
} from "../../utils";
import { Link, createLinkFromHref } from "../link";

export interface Tag {
  readonly name: string;
  readonly type?: string;
  readonly title: string;
  readonly description?: string;
  readonly links: readonly Link[];
}

export interface CreateTagParams {
  readonly title: string;
  readonly type?: string;
  readonly description?: string;
  readonly links?: readonly string[];
}

export const createTagValidator = object({
  title: string(),
  type: string().optional(),
  description: string().optional(),
  links: array(string()).optional(),
});

export function createTag(
  params: CreateTagParams | object
): Tag | ValidationError<Tag> {
  const validatorResult = createTagValidator.safeParse(params);
  if (!validatorResult.success) {
    return createValidationErrorFromZodError(validatorResult.error);
  }

  const { title, type, description, links } = params as CreateTagParams;

  return {
    name: snakeCase(title),
    title,
    ...(type?.trim() ? { type } : {}),
    ...(description?.trim() ? { description } : {}),
    links: links?.map(createLinkFromHref) ?? [],
  };
}

export function createTagFromName(name: string): Tag {
  return {
    name: snakeCase(name),
    title: sentenceCase(name),
    links: [],
  };
}

export function parseTags(input: string): readonly Tag[] {
  return parseTagNames(input).map(createTagFromName);
}

export function parseTagNames(input: string) {
  const outerBracketsPattern = new RegExp(/\((.*?)\)/g);

  const tagNames = Array.from(input.matchAll(outerBracketsPattern)).map(
    (match) => match[0]
  );

  return tagNames.map(snakeCase);
}
