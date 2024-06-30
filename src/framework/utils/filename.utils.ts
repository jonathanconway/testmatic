export function hasOneOfExtensions(extensions: readonly string[]) {
  return (filename: string) =>
    Boolean(
      extensions.find((extension) =>
        filename.toLowerCase().endsWith(`.${extension}`)
      )
    );
}
