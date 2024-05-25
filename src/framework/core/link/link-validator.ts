import { object, string } from "zod";

export const linkValidator = object({
  title: string().optional(),
  href: string(),
  type: string().optional(),
});
