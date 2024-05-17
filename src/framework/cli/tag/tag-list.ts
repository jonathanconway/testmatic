import { toAsciiTable } from "../ascii.utils";
import { readProject } from "../project.utils";

export function cliTagList() {
  const { tags } = readProject();

  console.log(
    toAsciiTable(
      Object.values(tags).map((tag) => ({
        Name: tag.title,
        Doc: `./docs/tags/${tag.name}.md`,
      }))
    )
  );
}
