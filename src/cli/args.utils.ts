function tryParseJSON(maybeJson: string) {
  try {
    return JSON.parse(maybeJson);
  } catch (error) {
    return maybeJson;
  }
}

export function pickArgs<T extends Record<string, string>>(
  fields: readonly (keyof T)[],
  args: readonly string[]
) {
  let values: Record<string, string> = {};
  let field: null | string = null;

  for (const arg of args) {
    if (field !== null) {
      values[field] = tryParseJSON(arg);
      field = null;
    }

    if (arg.startsWith("--") && fields.includes(arg.slice(2))) {
      field = arg.slice(2).toString();
    }
  }

  return values;
}

export function parseSwitch(arg: string): [string, string] {
  const [argsSplitted0, ...argsSplittedRest] = arg.split("=");
  return [argsSplitted0.replace("--", ""), argsSplittedRest.join("=")];
}

export function parseSwitches(args: readonly string[]) {
  return Object.fromEntries(args.map(parseSwitch));
}
