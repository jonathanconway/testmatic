import { Tag } from "../tag";

export function getTagLinkByHrefOrTitle({
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

  throw new Error(
    `Cannot find link in tag ${tag.name} with title or href matching "${linkHrefOrTitle}"`
  );
}
