import { appendFileSync, existsSync, writeFileSync } from "fs";

import { Tag } from "../core";
import { Maybe, convertTokenToSnakeParts } from "../utils";

export interface GenerateTokenInfo {
  readonly token: string;
}

export interface TokenFilesInfo {
  readonly tokenFilePathAndName: string;
  readonly tokenFileContent: string;
  readonly tagsIndexFilePathAndName: string;
  readonly tokenFileExport: string;
}

export function generateTokenFiles({ token }: GenerateTokenInfo) {
  const tokenFiles = generateToken({ token });
  if (!tokenFiles) {
    return;
  }
  generateTokenFilesFromInfo(tokenFiles);
}

export function generateTokenFilesFromInfo({
  tokenFilePathAndName,
  tokenFileContent,
  tagsIndexFilePathAndName,
  tokenFileExport,
}: TokenFilesInfo) {
  if (!existsSync(tokenFilePathAndName)) {
    appendFileSync(tagsIndexFilePathAndName, tokenFileExport);
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
  const tokenFileNameBody = `${name}.${type}.token`.toLowerCase();
  const tokenFileName = `${tokenFileNameBody}.ts`;
  const tokenFilePathAndName = `${__dirname}/../../tags/${tokenFileName}`;
  const tokenFileContent = `
import { createToken } from "../framework";

export const ${tokenFnName} = createToken(
  "${name}",
  "${type}",
);
  `.trim();
  const tokenFileExport = `export * from "./${tokenFileNameBody}";\n`;
  const tagsIndexFilePathAndName = `${__dirname}/../../tags/index.ts`;

  return {
    tokenFilePathAndName,
    tokenFileContent,
    tokenFileExport,
    tagsIndexFilePathAndName,
  };
}

function convertStringDictionaryToJavascriptCode<T extends {}>(input: T) {
  return (
    "{ " +
    Object.entries(input).map(([name, value]) => `${name}: "${value}"`) +
    " }"
  );
}

export function generateTokenFromObject({
  token,
}: {
  token: Tag;
}): Maybe<TokenFilesInfo> {
  const tokenSnakeParts = convertTokenToSnakeParts(token.name);
  if (!tokenSnakeParts) {
    return undefined;
  }

  const { tagType: type, name, links } = token;

  const tokenFnName = `${name}_${type}`;
  const tokenFileNameBody = `${name}.${type}.token`.toLowerCase();
  const tokenFileName = `${tokenFileNameBody}.ts`;
  const tokenFilePathAndName = `${__dirname}/../../tags/${tokenFileName}`;
  const tokenLinks = links.map(convertStringDictionaryToJavascriptCode);

  const tokenFileContent = `
import { createToken } from "../framework";

export const ${tokenFnName} = createToken(
  "${name}",
  "${type}",
  [${tokenLinks.join(", ")}]
);
  `.trim();
  const tokenFileExport = `export * from "./${tokenFileNameBody}";\n`;
  const tagsIndexFilePathAndName = `${__dirname}/../../tags/index.ts`;

  return {
    tokenFilePathAndName,
    tokenFileContent,
    tokenFileExport,
    tagsIndexFilePathAndName,
  };
}
