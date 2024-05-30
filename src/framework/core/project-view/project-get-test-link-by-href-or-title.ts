import { NotFoundError } from "../../utils";
import { Test } from "../test";

export function projectGetTestLinkByHrefOrTitle({
  test,
  linkHrefOrTitle,
}: {
  readonly test: Test;
  readonly linkHrefOrTitle: string;
}) {
  const testLinkByHref = test.links.find(
    (link) => link.href === linkHrefOrTitle
  );

  const testLinkByHrefOrName =
    testLinkByHref ?? test.links.find((link) => link.title === linkHrefOrTitle);

  const testLink = testLinkByHrefOrName;

  if (!testLink) {
    return new NotFoundError(
      `Cannot find link in test "${test.title}" with title or href matching "${linkHrefOrTitle}".`
    );
  }

  return testLink;
}
