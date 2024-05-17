import difference from "lodash/difference";

import { addProjectTagLink, createLink } from "../../core";
// import { validateLink } from "../../core/link/link.validator";
import {
  convertProjectJSONToProject,
  readProjectFile,
  writeProjectFile,
} from "../../exporters/json";
import { pickArgs } from "../args.utils";
import { readProject, writeProject } from "../project.utils";
import { promptFields } from "../prompt.utils";

// import { generateTagDoc } from "../../doc-generators";

const fieldLabels = {
  tagName: "Tag name",
  title: "Link title",
  href: "Link href",
  type: "Link type",
};

const fields = Object.entries(fieldLabels).map(([name, title]) => ({
  name,
  title,
}));

type FieldName = keyof typeof fieldLabels;

const fieldKeys = fields.map((field) => field.name);

export async function cliTagLinkAdd(args: readonly string[]) {
  const argParams = pickArgs(fieldKeys, args);

  const promptParams = promptFields(
    difference(fieldKeys, Object.keys(argParams)),
    fieldLabels
  );

  const params = { ...argParams, ...promptParams } as Record<FieldName, string>;

  // validateLink(params);

  const project = await readProject();

  const { tagName } = params;

  const newLink = createLink(params);

  const updatedProject = addProjectTagLink({
    project,
    tagName,
    newLink,
  });

  // const newProject = {
  //   ...project,
  //   tags: [
  //     ...project.tags,

  //       ...project.tags[params.tagName],
  //       links: {
  //         ...project.tags[params.tagName].links,
  //         [newLink.name]: newLink,
  //       },

  //     ],
  // };

  // writeProjectFile(newProject);

  writeProject(updatedProject);

  // const newToken = {
  //   ...tag,
  //   links: [...(tag?.links ?? []), params],
  // };

  // generateTokenFilesFromInfo(generateTokenFromObject({ token: newToken }));
}
