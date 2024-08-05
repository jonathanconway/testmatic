import { createNameFromTitle } from "../../../utils/name.utils";

export type TestName = string;

export function testCreateNameFromTitle(title: string): TestName {
  return createNameFromTitle(title);
}
