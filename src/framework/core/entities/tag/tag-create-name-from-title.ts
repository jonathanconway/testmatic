import { createNameFromTitle } from "../../../utils/name.utils";

export type TagName = string;
// todo: maybe delete
export function tagCreateNameFromTitle(title: string): TagName {
  return createNameFromTitle(title);
}
