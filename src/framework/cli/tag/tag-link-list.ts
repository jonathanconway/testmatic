import {
  convertProjectJSONToProject,
  readProjectFile,
} from "../../exporters/json";
import { pickArgs } from "../args.utils";

export function cliTagLinkList(args: readonly string[]) {
  const { tagsByName } = convertProjectJSONToProject(readProjectFile());

  const { tag: name } = pickArgs(["tag"], args);

  const tag = tagsByName[name];

  if (!tag) {
    return;
  }

  console.log(`Tag ${tag.name} links:\n\n`);

  const tokenLinksString = tag.links
    .map((link) =>
      ["•", link.title ?? link.href, link.title ? link.href : ""]
        .map((part) => part.trim())
        .join(" ")
    )
    .join("\n");

  console.log(tokenLinksString);
}
