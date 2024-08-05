import { NotFoundError } from "../../utils";
import { Tag } from "../entities";

export function projectGetTagLinkByHrefOrTitle({
  tag,
  lookupLinkHref,
}: {
  readonly tag: Tag;
  readonly lookupLinkHref: string;
}) {
  const tagLinkByHref = tag.links.find((tag) => tag.href === lookupLinkHref);

  const tagLinkByHrefOrName =
    tagLinkByHref ?? tag.links.find((tag) => tag.title === lookupLinkHref);

  const tagLink = tagLinkByHrefOrName;

  if (!tagLink) {
    return new NotFoundError(
      `Cannot find link in tag "${tag.title}" with href matching "${lookupLinkHref}".`
    );
  }

  return tagLink;
}
