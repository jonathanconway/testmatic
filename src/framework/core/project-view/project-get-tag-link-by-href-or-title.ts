import { Tag } from "../tag";

export function projectGetTagLinkByHrefOrTitle({
  tag,
  tagLinkHrefOrTitle,
}: {
  readonly tag: Tag;
  readonly tagLinkHrefOrTitle: string;
}) {
  const tagLinkByHref = tag.links.find(
    (tag) => tag.href === tagLinkHrefOrTitle
  );

  const tagLinkByHrefOrName =
    tagLinkByHref ?? tag.links.find((tag) => tag.title === tagLinkHrefOrTitle);

  const tagLink = tagLinkByHrefOrName;

  if (tagLink) {
    return tagLink;
  }

  throw new Error(
    `Cannot find link in tag ${tag.name} with title or href matching "${tagLinkHrefOrTitle}"`
  );
}
