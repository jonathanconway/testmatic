export interface Link {
  readonly href: string;
  readonly title?: string;
}

export interface CreateLinkParams {
  readonly href: string;
  readonly title?: string;
}

export function createLink(link: CreateLinkParams): Link {
  return link;
}

export function createLinkFromInput(input: string): Link {
  const parts = input.split("|");
  const href = parts.slice(-1)[0];
  const title = parts.length > 1 ? parts.slice(0)[0] : undefined;
  return {
    href,
    title,
  };
}
