import { fromPairs, snakeCase } from "lodash";

import {
  Link,
  ProjectView,
  Run,
  RunResult,
  Step,
  Tag,
  Test,
  createProjectView,
  createTagFromName,
  parseTagNames,
} from "../../core";
import { fieldOrEmpty } from "../../utils";

export interface ProjectJSON {
  readonly tests: Record<string, ProjectJSONTest>;
  readonly tags: Record<string, ProjectJSONTag>;
}

export function convertProjectToProjectJSON(project: ProjectView): ProjectJSON {
  const tests = fromPairs(
    project.tests
      .map(convertTestToProjectJSONTest)
      .map((test) => [test.name, test])
  );
  const tags = fromPairs(
    project.tags.map(convertTagToProjectJSONTag).map((tag) => [tag.name, tag])
  );

  return {
    tests,
    tags,
  };
}

export function convertProjectJSONToProject(
  projectJSON: ProjectJSON
): ProjectView {
  const tags = Object.values(projectJSON.tags).map(convertProjectJSONTagToTag);
  const tagsByName = Object.fromEntries(tags.map((tag) => [tag.name, tag]));
  const tests = Object.values(projectJSON.tests).map(
    convertProjectJSONTestToTest(projectJSON, tagsByName)
  );

  return createProjectView({
    tests,
    tags,
  });
}

interface ProjectJSONTest {
  readonly title: string;
  readonly name: string;
  readonly stepTexts: ReadonlyArray<string>;
  readonly description?: string;
  readonly links: readonly ProjectJSONLink[];
  readonly tagNames: readonly string[];
  readonly runs: readonly ProjectJSONRun[];
}

function convertTestToProjectJSONTest(test: Test): ProjectJSONTest {
  return {
    title: test.title,
    name: test.name,
    description: test.description,
    links: test.links.map(convertLinkToProjectJSONLink),
    stepTexts: test.steps.map((step) => step.text),
    tagNames: test.tags.map((tag) => tag.name),
    runs: test.runs.map(convertRunToProjectRunJSON),
  };
}

interface ProjectJSONLink {
  readonly href: string;
  readonly title?: string;
}

function convertLinkToProjectJSONLink(link: Link): ProjectJSONLink {
  return {
    href: link.href,
    title: link.title,
  };
}

interface ProjectJSONTag {
  readonly name: string;
  readonly title: string;
  readonly tagType?: string;
  readonly description?: string;
  readonly links: readonly ProjectJSONLink[];
}

function convertTagToProjectJSONTag(tag: Tag): ProjectJSONTag {
  return {
    name: tag.name,
    title: tag.title,

    ...fieldOrEmpty("tagType", tag.tagType),
    ...fieldOrEmpty("description", tag.description),

    links: tag.links.map(convertLinkToProjectJSONLink),
  };
}

interface ProjectJSONRun {
  readonly dateTime: string;
  readonly result?: RunResult;
  readonly links: readonly ProjectJSONLink[];
  readonly recordings: readonly string[];
}

function convertRunToProjectRunJSON(run: Run): ProjectJSONRun {
  return {
    dateTime: run.dateTime,
    result: run.result,
    links: run.links.map(convertLinkToProjectJSONLink),
    recordings: run.recordings,
  };
}

function convertProjectJSONTestToTest(
  projectJSON: ProjectJSON,
  tagsByName: Record<string, Tag>
) {
  return (projectJSONTest: ProjectJSONTest): Test => ({
    type: "test",
    name: projectJSONTest.name,
    title: projectJSONTest.title,
    description: projectJSONTest.description,
    steps: projectJSONTest.stepTexts.map(
      convertProjectJSONStepToStep(projectJSON)
    ),
    runs: projectJSONTest.runs.map(convertProjectJSONRunToRun),
    links: projectJSONTest.links.map(convertProjectJSONLinkToLink),
    tags: projectJSONTest.tagNames
      .map(convertProjectJSONTestTagToTag(projectJSON))
      .map((tag) => tagsByName[tag.name] ?? tag),
  });
}

function convertProjectJSONStepToStep(projectJSON: ProjectJSON) {
  return (projectJSONStep: string): Step => ({
    text: projectJSONStep,
    tags: parseTagNames(projectJSONStep)
      .map(snakeCase)
      .map(convertProjectJSONTestTagToTag(projectJSON))
      .map(convertProjectJSONTagToTag),
  });
}

function convertProjectJSONTestTagToTag(projectJSON: ProjectJSON) {
  return (tagName: string): Tag =>
    (projectJSON.tags[tagName] as Tag) ?? createTagFromName(tagName);
}

function convertProjectJSONTagToTag(projectJSONTag: ProjectJSONTag): Tag {
  return {
    type: "tag",
    name: projectJSONTag.name,
    title: projectJSONTag.title,

    ...fieldOrEmpty("tagType", projectJSONTag.tagType),
    ...fieldOrEmpty("description", projectJSONTag.description),

    links: projectJSONTag.links,
  };
}

function convertProjectJSONLinkToLink(projectJSONRun: ProjectJSONLink): Link {
  return {
    href: projectJSONRun.href,
    title: projectJSONRun.title,
  };
}

function convertProjectJSONRunToRun(projectJSONRun: ProjectJSONRun): Run {
  return {
    dateTime: projectJSONRun.dateTime,
    result: projectJSONRun.result,
    links: projectJSONRun.links,
    recordings: projectJSONRun.recordings,
  };
}
