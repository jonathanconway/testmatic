import * as promptSync from "prompt-sync";

import { generateTestFile } from "../code-generators";

const prompt = promptSync();

function getGenTestInfoFromArgs(args: readonly string[]) {
  const populatedArgs = args.filter((arg) => arg.trim().length > 0);

  if (populatedArgs.length === 0) {
    return undefined;
  }

  const title = populatedArgs[0];

  const steps = populatedArgs.slice(1);

  if (steps.find((n) => isNaN(Number(n)))) {
    return undefined;
  }

  return {
    title,
    steps,
  };
}

function getGenTestInfoFromPrompts() {
  const title = prompt("Please enter test title: ");

  if (!title) {
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
    title,
    steps,
  };
}

export function cliGenTest(args: readonly string[]) {
  const testInfo = getGenTestInfoFromArgs(args) ?? getGenTestInfoFromPrompts();

  if (!testInfo) {
    return;
  }

  generateTestFile(testInfo);
}
