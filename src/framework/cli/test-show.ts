import * as tests from "../../tests";
import { generateTestDoc } from "../doc-generators";

export function cliTestShow(args: readonly string[]) {
  const arg = args[0];

  const test = Object.values(tests).find(
    (test) => test.name === arg || test.title === arg
  );

  console.log(generateTestDoc(test));
}
