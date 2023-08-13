import * as tests from "../../tests";
import * as tokens from "../../tokens";
import { getTokensHavingTest } from "../core";
import { convertToAsciiTable } from "./cli.utils";

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

  const testList = testsToDisplay.map((test) => ({
    title: test.title,
    doc: `./docs/tests/${test.name}.md`,
  }));

  console.log(convertToAsciiTable(testList));
}
