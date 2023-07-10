import * as promptSync from "prompt-sync";

import { generateTest } from "../code-generators";

const prompt = promptSync();

function getGenTestInfoFromArgs(args: readonly string[]) {
  const populatedArgs = args.filter((arg) => arg.trim().length > 0);

  if (populatedArgs.length === 0) {
    return undefined;
  }

  const testTitle = populatedArgs[0];

  const steps = populatedArgs.slice(1);

  if (steps.find((n) => isNaN(Number(n)))) {
    return undefined;
  }

  return {
    testTitle,
    steps,
  };
}

function getGenTestInfoFromPrompts() {
  const testTitle = prompt("Please enter test title: ");

  if (!testTitle) {
    return;
  }

  console.log(
    "\nThank you!\n\nNow, please enter your steps, one-by-one.\n(Empty line to finish)\n"
  );

  const steps = [];
  let stepIndex = 1;
  while (true) {
    const step = prompt(`${stepIndex}. `);
    if (step === "") {
      break;
    }

    steps.push(step);
    stepIndex++;
  }

  return {
    testTitle,
    steps,
  };
}

export function cliGenTest(args: readonly string[]) {
  const testInfo = getGenTestInfoFromArgs(args) ?? getGenTestInfoFromPrompts();

  if (!testInfo) {
    return;
  }

  generateTest(testInfo);
}
