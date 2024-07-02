import { Command } from "commander";
import { trim } from "lodash";

import { cliInitCommand } from "../cli/init/cli-init";
import { cliProjectCreateCommand } from "../cli/project/cli-project-create";
import { cliRunOpenCommand } from "../cli/run/cli-run-open";
import { cliRunShowCommand } from "../cli/run/cli-run-show";
import { cliTagAddCommand } from "../cli/tag/cli-tag-add";
import { cliTagDeleteCommand } from "../cli/tag/cli-tag-delete";
import { cliTagImpactsCommand } from "../cli/tag/cli-tag-impacts";
import { cliTagLinkAddCommand } from "../cli/tag/cli-tag-link-add";
import { cliTagLinkDeleteCommand } from "../cli/tag/cli-tag-link-delete";
import { cliTagLinkOpenCommand } from "../cli/tag/cli-tag-link-open";
import { cliTagListCommand } from "../cli/tag/cli-tag-list";
import { cliTagShowCommand } from "../cli/tag/cli-tag-show";
import { cliTagTypeCommand } from "../cli/tag/cli-tag-type";
import { cliTestAddCommand } from "../cli/test/cli-test-add";
import { cliTestDeleteCommand } from "../cli/test/cli-test-delete";
import { cliTestLinkAddCommand } from "../cli/test/cli-test-link-add";
import { cliTestLinkDeleteCommand } from "../cli/test/cli-test-link-delete";
import { cliTestLinkOpenCommand } from "../cli/test/cli-test-link-open";
import { cliTestListCommand } from "../cli/test/cli-test-list";
import { cliTestShowCommand } from "../cli/test/cli-test-show";
import { isNotNil } from "../framework";

import { interpolate } from "./interpolate.utils";

export function buildReadmeCliDocs() {
  const commands = [
    {
      name: "init",
      command: cliInitCommand,
    },
    {
      name: "project create",
      command: cliProjectCreateCommand,
    },
    {
      name: "test list",
      command: cliTestListCommand,
    },
    {
      name: "test add",
      command: cliTestAddCommand,
    },
    {
      name: "test delete",
      command: cliTestDeleteCommand,
    },
    {
      name: "test show",
      command: cliTestShowCommand,
    },
    {
      name: "test link add",
      command: cliTestLinkAddCommand,
    },
    {
      name: "test link delete",
      command: cliTestLinkDeleteCommand,
    },
    {
      name: "test link open",
      command: cliTestLinkOpenCommand,
    },
    {
      name: "tag list",
      command: cliTagListCommand,
    },
    {
      name: "tag add",
      command: cliTagAddCommand,
    },
    {
      name: "tag delete",
      command: cliTagDeleteCommand,
    },
    {
      name: "tag show",
      command: cliTagShowCommand,
    },
    {
      name: "tag link add",
      command: cliTagLinkAddCommand,
    },
    {
      name: "tag link delete",
      command: cliTagLinkDeleteCommand,
    },
    {
      name: "tag link open",
      command: cliTagLinkOpenCommand,
    },
    {
      name: "tag type",
      command: cliTagTypeCommand,
    },
    {
      name: "tag impacts",
      command: cliTagImpactsCommand,
    },
    {
      name: "run show",
      command: cliRunShowCommand,
    },
    {
      name: "run open",
      command: cliRunOpenCommand,
    },
  ];

  const md = commands
    .map(
      ({ name, command }) => `
#### ${name}

Usage: ${getCleanedCommandAndUsageText(name, command)}

${command.description()}

${
  command.options.length > 0
    ? `
Options:

<table>
<thead>
  <tr>
    <th>Syntax</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  ${command.options
    .map((o) =>
      `
<tr>
<td>
${o.flags
  .split(",")
  .map((flag) => `<code>${escapeTagBrackets(flag)}</code>`)
  .join(",<br />")}
</td>
<td>
${o.description}
</td>
</tr>
`.trim()
    )
    .join("\n")}
</tbody>
</table>`
    : ""
}
`
    )
    .join("\n");

  interpolate(__dirname + "/../../README.md", "cli-reference", md);
}

function escapeTagBrackets(input: string) {
  return input.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function getCleanedCommandAndUsageText(name: string, command: Command) {
  const cleanedCommandAndUsageText = [name, getCleanedUsageText(command)]
    .map(trim)
    .filter(isNotNil)
    .join(" ")
    .trim();
  return `\`${cleanedCommandAndUsageText}\``;
}

function getCleanedUsageText(command: Command) {
  const usageText = command.usage();
  if (command.options.length === 0) {
    return usageText.replaceAll("[options]", "").removeDoubleSpaces().trim();
  }
  return usageText.trim();
}
buildReadmeCliDocs();
