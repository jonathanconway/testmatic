import { NotFoundError } from "../../utils";
import { Tag } from "../tag";

export function projectGetTagLinkByHrefOrTitle({
  tag,
  linkHrefOrTitle,
}: {
  readonly tag: Tag;
  readonly linkHrefOrTitle: string;
}) {
  const tagLinkByHref = tag.links.find((tag) => tag.href === linkHrefOrTitle);

  const tagLinkByHrefOrName =
    tagLinkByHref ?? tag.links.find((tag) => tag.title === linkHrefOrTitle);

  const tagLink = tagLinkByHrefOrName;

  if (tagLink) {
    return tagLink;
  }

  throw new NotFoundError(
    `Cannot find link in tag "${tag.title}" with title or href matching "${linkHrefOrTitle}"`
  );
}
