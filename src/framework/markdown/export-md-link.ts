import { Link } from "../core";

export function exportMdLink({ title, href }: Link) {
  return `[${title?.trim() || href}](${href})`;
}
