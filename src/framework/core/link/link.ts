export interface Link {
  readonly title?: string;
  readonly href: string;
}

export function createLink(link: {
  readonly title?: string;
  readonly href: string;
}) {
  return link;
}

export function createLinkFromHref(href: string) {
  return {
    href,
  };
}
