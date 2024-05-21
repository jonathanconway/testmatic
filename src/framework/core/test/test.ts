import snakeCase from "lodash/snakeCase";
import { array, object, string } from "zod";

import {
  ValidationError,
  ZOD_REGEX_ALPHA_NUMBERS_UNDERSCORES,
  ZOD_REGEX_START_WITH_ALPHA,
  createValidationErrorFromZodError,
  sentenceCase,
} from "../../utils";
import { Link, createLinkFromInput } from "../link";
import { MarkdownSource } from "../markdown";
import { Run } from "../run";
import { Step, createTestStepFromText } from "../step";
import { Tag, createTagFromName } from "../tag";

export interface Test {
  readonly name: string;
  readonly title: MarkdownSource;
  readonly description?: MarkdownSource;
  readonly steps: readonly Step[];
  readonly links: readonly Link[];
  readonly tags: readonly Tag[];
  readonly runs: readonly Run[];
}

export interface CreateTestParams {
  readonly title: string;
  readonly description?: string;
  readonly steps: readonly string[];
  readonly links?: readonly string[];
  readonly tags?: readonly string[];
}

export const createTestValidator = object({
  title: string()
    .regex(
      ZOD_REGEX_ALPHA_NUMBERS_UNDERSCORES.regex,
      ZOD_REGEX_ALPHA_NUMBERS_UNDERSCORES.message
    )
    .regex(
      ZOD_REGEX_START_WITH_ALPHA.regex,
      ZOD_REGEX_START_WITH_ALPHA.message
    ),
  description: string().optional(),
  steps: array(string()).nonempty(),
  links: array(string()).optional(),
  tags: array(string()).optional(),
});

export function createTest(
  params: CreateTestParams | object
): Test | ValidationError<Test> {
  const validatorResult = createTestValidator.safeParse(params);
  if (!validatorResult.success) {
    return createValidationErrorFromZodError(validatorResult.error);
  }

  const { title, description, steps, links, tags } = params as CreateTestParams;

  return {
    name: snakeCase(title),
    title: sentenceCase(title),
    description,
    steps: steps.map(createTestStepFromText),
    links: links?.map(createLinkFromInput) ?? [],
    tags: tags?.map(createTagFromName) ?? [],
    runs: [],
  };
}
