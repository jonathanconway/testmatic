import { snakeCase } from "lodash";

export type TestName = string;

export function testCreateNameFromTitle(title: string): TestName {
  return snakeCase(title);
}
