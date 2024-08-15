import { snakeCase } from "lodash";
import { array, object, string } from "zod";

import {
  ValidationError,
  ZOD_REGEX_START_WITH_ALPHA,
  createValidationErrorFromZodError,
  sentenceCase,
} from "../../../utils";
import { ItemTypes } from "../item";
import { createLinkFromInput } from "../link";

import { Tag } from "./tag";
import { tagCreateNameFromTitle } from "./tag-create-name-from-title";
import { tagCreateTitleFromName } from "./tag-create-title-from-name";
import { tagValidator } from "./tag-validator";

export interface CreateTagParams {
  readonly title: string;
  readonly tagType?: string;
  readonly description?: string;
  readonly links?: readonly string[];
}

export const createTagParamsValidator = object({
  title: string().regex(...ZOD_REGEX_START_WITH_ALPHA),
  tagType: string().optional(),
  description: string().optional(),
  links: array(string()).optional(),
});

export function createTag(params: CreateTagParams): Tag | ValidationError {
  const validatorResult = createTagParamsValidator.safeParse(params);
  if (!validatorResult.success) {
    return createValidationErrorFromZodError(validatorResult.error);
  }

  const { title, tagType, description, links } = params as CreateTagParams;

  const newTag = {
    type: ItemTypes.Tag,
    name: tagCreateNameFromTitle(title),
    title: tagCreateTitleFromName(title),
    ...(tagType?.trim() ? { tagType } : {}),
    ...(description?.trim() ? { description } : {}),
    links: links?.map(createLinkFromInput) ?? [],
  } as Tag;

  const tagValidatorResult = tagValidator.safeParse(newTag);
  if (!tagValidatorResult.success) {
    return createValidationErrorFromZodError(tagValidatorResult.error);
  }

  return newTag;
}

export function createTagFromName(name: string): Tag | ValidationError {
  const createTagParams = {
    type: ItemTypes.Tag,
    name: snakeCase(name),
    title: sentenceCase(name),
    links: [],
  };

  return createTag(createTagParams);
}
