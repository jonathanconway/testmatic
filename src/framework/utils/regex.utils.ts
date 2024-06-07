export function endsWithRegex(endsWith: string) {
  return new RegExp(`.*${endsWith}$`, "i");
}
