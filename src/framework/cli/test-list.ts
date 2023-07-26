import * as tests from "../../tests";
import * as tokens from "../../tokens";
import { getTokensHavingTest } from "../core";

export function cliTestList(args: readonly string[]) {
  let testsToDisplay = Object.values(tests);

  for (const tokenFilterArg of args.filter((arg) =>
    arg.startsWith("--filter-token=")
  )) {
    const tokenFilterValue = tokenFilterArg
      .split("--filter-token=")[1]
      .replaceAll('"', "");

    const token = tokens[tokenFilterValue as keyof typeof tokens];

    if (Object.keys(tokens).includes(tokenFilterValue)) {
      testsToDisplay = testsToDisplay.filter((test) =>
        getTokensHavingTest(test, Object.values(tokens)).includes(token)
      );
    }
  }

  console.log(
    testsToDisplay
      .map((test) => `${test.title} | ./docs/tests/${test.name}.md`)
      .join("\n")
  );
}
