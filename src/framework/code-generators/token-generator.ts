import { appendFileSync, existsSync, writeFileSync } from "fs";

import { convertTokenToSnakeParts } from "../utils";

export interface GenerateTokenInfo {
  readonly token: string;
}

export function generateTokenFiles({ token }: GenerateTokenInfo) {
  const tokenFile = generateToken({ token });
  if (!tokenFile) {
    return;
  }

  const {
    tokenFilePathAndName,
    tokenFileContent,
    tokensIndexFilePathAndName,
    tokenFileExport,
  } = tokenFile;

  if (!existsSync(tokenFilePathAndName)) {
    appendFileSync(tokensIndexFilePathAndName, tokenFileExport);
    writeFileSync(tokenFilePathAndName, tokenFileContent);
  }
}

export function generateToken({ token }: GenerateTokenInfo) {
  const tokenSnakeParts = convertTokenToSnakeParts(token);

  if (!tokenSnakeParts) {
    return undefined;
  }

  const { type, name } = tokenSnakeParts;

  const tokenFnName = `${name}_${type}`;
  const tokenFileNameBody = `${name}.${type}.token`;
  const tokenFileName = `${tokenFileNameBody}.ts`;
  const tokenFilePathAndName = `${__dirname}/../../tokens/${tokenFileName}`;
  const tokenFileContent = `
import { createToken } from "../framework";

export const ${tokenFnName} = createToken(
  "${name}",
  "${type}",
);
  `.trim();
  const tokenFileExport = `export * from "./${tokenFileNameBody}";\n`;
  const tokensIndexFilePathAndName = `${__dirname}/../../tokens/index.ts`;

  return {
    tokenFilePathAndName,
    tokenFileContent,
    tokenFileExport,
    tokensIndexFilePathAndName,
  };
}
