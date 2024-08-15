import { array, object, string } from "zod";

import {
  ValidationError,
  ZOD_REGEX_START_WITH_ALPHA,
  createValidationErrorFromZodError,
  sentenceCase,
} from "../../../utils";
import { ItemTypes } from "../item";
import { createLinkFromInput } from "../link";
import { createTestStepFromText } from "../step";
import { createTagFromName, isTag } from "../tag";

import { Test } from "./test";
import { testCreateNameFromTitle } from "./test-create-name-from-title";
import { testValidator } from "./test-validator";

export interface CreateTestParams {
  readonly title: string;
  readonly description?: string;
  readonly stepTexts?: readonly string[];
  readonly linkNames?: readonly string[];
  readonly tagNames?: readonly string[];
}

export const createTestParamsValidator = object({
  title: string().regex(...ZOD_REGEX_START_WITH_ALPHA),
  description: string().optional(),
  stepTexts: array(string()),
  linkNames: array(string()).optional(),
  tagNames: array(string()).optional(),
});

export function createTest(params: CreateTestParams): Test | ValidationError {
  const paramsValidatorResult = createTestParamsValidator.safeParse(params);
  if (!paramsValidatorResult.success) {
    return createValidationErrorFromZodError(paramsValidatorResult.error);
  }

  const { title, description, stepTexts, linkNames, tagNames } =
    params as CreateTestParams;

  const newTest = {
    type: ItemTypes.Test,
    name: testCreateNameFromTitle(title),
    title: sentenceCase(title),
    description,
    steps: stepTexts?.map(createTestStepFromText) ?? [],
    links: linkNames?.map(createLinkFromInput) ?? [],
    tags: tagNames?.map(createTagFromName).filter(isTag) ?? [],
    runs: [],
  } as Test;

  const testValidatorResult = testValidator.safeParse(newTest);
  if (!testValidatorResult.success) {
    return createValidationErrorFromZodError(testValidatorResult.error);
  }

  return newTest;
}
