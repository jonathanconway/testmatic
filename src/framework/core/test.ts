import { convertToSentenceCaseWithTokens } from "../utils";
import { Step } from "./step";

export interface Test {
  readonly name: string;
  readonly title: string;
  readonly steps: readonly Step[];
  readonly run: () => Promise<void>;
}

export function createTest({
  name,
  steps,
}: {
  name: string;
  steps: readonly Step[];
}): Test {
  return {
    name,
    title: convertToSentenceCaseWithTokens(name),
    steps,
    run: async () => {
      for await (const step of steps) {
        await step.run();
      }
    },
  };
}
