import { snakeCase } from "lodash";
import { array, object, string } from "zod";

import {
  ValidationError,
  ZOD_REGEX_START_WITH_ALPHA,
  createValidationErrorFromZodError,
  sentenceCase,
} from "../../utils";
import { createLinkFromInput } from "../link";
import { createTestStepFromText } from "../step";
import { createTagFromName, isTag } from "../tag";

import { Test } from "./test";
import { testValidator } from "./test-validator";

export interface CreateTestParams {
  readonly title: string;
  readonly description?: string;
  readonly stepTexts: readonly string[];
  readonly linkNames?: readonly string[];
  readonly tagNames?: readonly string[];
}

export const createTestParamsValidator = object({
  title: string().regex(
    ZOD_REGEX_START_WITH_ALPHA.regex,
    ZOD_REGEX_START_WITH_ALPHA.message
  ),
  description: string().optional(),
  stepTexts: array(string()).nonempty(),
  linkNames: array(string()).optional(),
  tagNames: array(string()).optional(),
});

export function createTest(
  params: CreateTestParams | object
): Test | ValidationError {
  const paramsValidatorResult = createTestParamsValidator.safeParse(params);
  if (!paramsValidatorResult.success) {
    return createValidationErrorFromZodError(paramsValidatorResult.error);
  }

  const { title, description, stepTexts, linkNames, tagNames } =
    params as CreateTestParams;

  const newTest = {
    type: "test",
    name: snakeCase(title),
    title: sentenceCase(title),
    description,
    steps: stepTexts.map(createTestStepFromText),
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
