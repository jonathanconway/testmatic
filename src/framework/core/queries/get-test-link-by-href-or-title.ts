import { NotFoundError } from "../../utils";
import { Test } from "../entities";

export function projectGetTestLinkByHrefOrTitle({
  test,
  lookupLinkHref,
}: {
  readonly test: Test;
  readonly lookupLinkHref: string;
}) {
  const testLinkByHref = test.links.find(
    (link) => link.href === lookupLinkHref
  );

  const testLinkByHrefOrName =
    testLinkByHref ?? test.links.find((link) => link.title === lookupLinkHref);

  const testLink = testLinkByHrefOrName;

  if (!testLink) {
    return new NotFoundError(
      `Cannot find link in test "${test.title}" with href matching "${lookupLinkHref}".`
    );
  }

  return testLink;
}
