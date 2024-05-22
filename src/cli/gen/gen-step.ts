import promptSync from "prompt-sync";

import { generateStepFiles } from "../../framework/code-generators";

function getGenStepInfoFromArgs(args: readonly string[]) {
  const populatedArgs = args.filter((arg) => arg.trim().length > 0);

  if (populatedArgs.length === 0) {
    return undefined;
  }

  const step = populatedArgs.join(" ");

  return {
    step,
  };
}

function getGenStepInfoFromPrompts() {
  const prompt = promptSync();

  const step = prompt("Please enter step: ");

  if (!step) {
    return;
  }

  return {
    step,
  };
}

export function cliGenStep(args: readonly string[]) {
  const step = getGenStepInfoFromArgs(args) ?? getGenStepInfoFromPrompts();

  if (!step) {
    return;
  }

  generateStepFiles(step);
}
