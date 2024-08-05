import { createTitleFromName } from "../../../utils/name.utils";

export type TagName = string;

export function tagCreateTitleFromName(name: string): TagName {
  return createTitleFromName(name);
}
