import promptSync from "prompt-sync";

import { generateTokenFiles } from "../../framework/code-generators";

const prompt = promptSync();

function getGenTokenInfoFromArgs(args: readonly string[]) {
  const populatedArgs = args.filter((arg) => arg.trim().length > 0);

  if (populatedArgs.length === 0) {
    return undefined;
  }

  const token = populatedArgs.join(" ");

  return {
    token,
  };
}

function getGenTokenInfoFromPrompts() {
  console.log(`Token format:
<name ... ...> <type>

Example: user account screen

Name is \`user\`, type is \`screen\`.
`);

  const token = prompt("Please enter token name: ");

  if (!token) {
    return;
  }

  return {
    token,
  };
}

export function cliGenToken(args: readonly string[]) {
  const tokenInfo =
    getGenTokenInfoFromArgs(args) ?? getGenTokenInfoFromPrompts();

  if (!tokenInfo) {
    return;
  }

  generateTokenFiles(tokenInfo);
}
