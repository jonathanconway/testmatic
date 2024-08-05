import { array, object, string } from "zod";

import { linkValidator } from "../link";

export const tagValidator = object({
  type: string(),
  name: string(),
  tagType: string().optional(),
  title: string(),
  description: string().optional(),
  links: array(linkValidator),
});
