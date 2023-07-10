import { Step } from "./step";
import { Token } from "./token";
import { Test } from "./test";

export function getTestsHavingToken(tests: readonly Test[], token: Token) {
  return tests.filter((test) => getNameHasToken(token)(test.name));
}

export function getStepsHavingToken(steps: readonly Step[], token: Token) {
  return steps.filter((step) => getNameHasToken(token)(step.name));
}

export function getTokensHavingTest(test: Test, tokens: readonly Token[]) {
  const tokenNameAndTypes = parseTokenNameAndTypes(test.name);
  const tokensHavingTest = tokens.filter((token) =>
    Boolean(
      tokenNameAndTypes.find(
        ({ nameAndType }) => token.nameAndType === nameAndType
      )
    )
  );

  return tokensHavingTest;
}

export function getStepTokens(
  step: Step,
  allTokens: readonly Token[]
): readonly Token[] {
  const tokenMatchNames = parseTokens(step.name);

  const tokensByName = Object.fromEntries(
    allTokens.map((token) => [token.name + "_" + token.type, token])
  );

  const tokens = tokenMatchNames
    .map((tokenName) => tokensByName[tokenName])
    .filter(Boolean);

  return tokens;
}

export function parseTokens(input: string) {
  const tokenPatternWithReplacement = new RegExp(/--[a-zA-Z0-9_]*--/g);

  const tokenMatches = Array.from(
    input.replaceAll("__", "--").matchAll(tokenPatternWithReplacement)
  );

  const tokens = tokenMatches.map(([match]) => match.replaceAll("--", ""));

  return tokens;
}

export function getNameHasToken(token: Token) {
  return function (input: string) {
    return Boolean(
      parseTokenNameAndTypes(input).find(
        ({ name, type }) => name === token.name && type === token.type
      )
    );
  };
}

export function parseTokenNameAndTypes(input: string) {
  return parseTokens(input).map(parseTokenNameAndType);
}

export function parseTokenNameAndType(nameAndType: string) {
  const parts = nameAndType.split("_");
  return {
    name: parts.slice(0, -1).join("_"),
    type: parts.slice(-1)[0],
    nameAndType,
  };
}
