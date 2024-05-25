import { array, object, string } from "zod";

import { linkValidator } from "../link/link-validator";

export const tagValidator = object({
  name: string(),
  type: string().optional(),
  title: string(),
  description: string().optional(),
  links: array(linkValidator),
});
