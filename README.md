# testmatic

> ⚡️ Supercharge your testing ⚙️

Testmatic is a command-line tool and framework for quickly and easily writing and organising human-readable test cases.

Simple lists of **_steps_** are grouped into **_tests_**, which can be organised by **_tags_**, allowing grouping / filtering.

Everything is stored in Markdown files, for easy viewing, editing, searching and version control. If pushed to a server, links to Markdown files can be shared within your org, via e.g. Wiki pages, Chat posts, email, etc.

The main benefit of using Testmatic is the ability to rapidly input and organise test cases. This helps you perform manual testing in an organised and consistent manner. Manual testing may be beneficial when automated test coverage is limited, development time is constrained and rapid delivery is required while minimising defects. (See: [Benefits of using Testmatic](#benefits-of-using-testmatic).)

## Contents

- [Intro](#intro)
- [Basics](#basics)
- [Advanced](#advanced)
- [Notes](#notes)
- [CLI reference](#cli_reference)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)

## Intro

### Getting started

Get started by installing Testmatic via the CLI.

#### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above.

#### Install Testmatic

Install globally via NPM:

```bash
npm install -g testmatic
```

#### Create a project

A Testmatic project consists of a `.testmatic` folder in your current working directory, containing sub-folders for `tests`, `tags` and `runs`.

You can generate the folders using the `init` command:

```bash
testmatic init
```

## Basics

### Creating a test

You can create your first test by running the `test add` command and answering prompt questions, pressing Enter/Return when done.

```bash
$ testmatic test add

Please enter test title: Homepage loads

Thank you!

Now, please enter your steps, one-by-one.
(Empty line to finish)

1. Navigate to homepage
2. Observe homepage has loaded
3.

$
```

Your test "Homepage loads" should now have been created.

You can verify this by running the `test list` command:

```bash
$ testmatic test list

TITLE                  NAME                   DOC
Should load homepage   should_load_homepage   ./.testmatic/tests/should_load_homepage.md

$
```

### Adding a tag to a test

Suppose you want to categorise your new test as applicable only to guest users (users who have not yet logged in).

You can add a tag to the test by running the `test tag add {tag-title}` command.

```bash
$ testmatic test tag add "should_load_homepage" "guest user"

$
```

> **Note:** We're using the test name `should_load_homepage` here. It's just the title condensed into one word using underlines: `_`. This makes it easier to copy/paste when needed.

Your new tag "Guest user" should now have been created and adeed to the "Homepage loads" test.

You can verify this by running the `test show` command:

```bash
$ testmatic test show should_load_homepage

Should load homepage
====================

Doc: ./.testmatic/tests/should_load_homepage.md

Steps
-----
    STEP
1   Navigate to homepage
2   Observe homepage has loaded

Links
-----
(No items)

Tags
----
NAME         TITLE        DOC
guest_user   Guest user   ./.testmatic/tags/guest_user.md

Runs
----
(No items)

$
```

You can see that your new tag was added.

If you explore your local `.testmatic` folder you'll see that the test and tag files were created:

- .testmatic
  - tests
    - should_load_homepage.md ⚡️
  - tags
    - guest_user.md ⚡️
  - runs

### Finding tests by tag

Suppose you added a few other tests involving various kinds of users. But now you want to filter by only tests involving a guest user. You can filter the list of tests by the "Guest user" tag using `test list` command with the `--tag` switch.

```bash
testmatic test list --tag "Guest user"

TITLE                  NAME                   DOC
Should load homepage   should_load_homepage   ./.testmatic/tests/should_load_homepage.md
```

## Advanced

### Runs

When you perform a test, you might want to record certain details:

- Date/time you performed the test
- Result of the test – success, failure, mixed
- Text and links
- Screen recordings (videos, images, etc.)
- Outputs (JSON or CSV files, etc.)

Testmatic has a Runs feature to help you with this.

Each test can have one or more runs.

Each run has:

- **One dated folder** containing a Markdown file and any other files you wish to include (screen recordings, outputs, etc.)
- **One dated Markdown file** containing the date/time, text and links (if any)

To create a run, simply run the `run add` command, providing the test name (or title) as the first parameter:

```bash
testmatic run add should_load_homepage
```

> **Note:** You can optionally provide a date-time stamp in the format: `YYYY-MM-DD_HH-MM`. For example: `2024-10-01_11:30` for October 1, 2024 at 11:30 AM.

The new run folder and Markdown file should now have been created.

You can verify this using the `run show` command:

```bash
$ testmatic run show should_load_homepage

Should load homepage – 24/3/2024 2:44
=====================================

Files
-----
FILE
./.testmatic/runs/should_load_homepage/2024-04-24_02-44/2024-04-24_02-44.md
```

A new folder and Markdown file will have been added:

- .testmatic
  - runs
    - should_load_homepage
      - 2024-04-24_02-44 ⚡️
        - 2024-04-24_02-44.md ⚡️

You can open that folder in Finder (on Mac) using the `run open` command:

```bash
testmatic run open should_load_homepage
```

> **Note:** How does Testmatic know which run to show / open? It uses the latest by default. But if you prefer to target an older run, can provide an additional argument of the date/time stamp of the run to the `run show` or `run open` command. See [run show](#run-show), [run open](#run-open) for details.

### Links

You might want to attach links to tests or tags.

For example:

- Links to documentation
- Links to web pages under test
- Links to screenshots or screen recordings
- Links to mock accounts

You can add/remove links manually by editing the test, tag or run Markdown files.

Testmatic also includes `test link add` and `tag link add` commands, allowing you to quickly add links to tests or tags respectively without leaving the command line.

```bash
$ testmatic test link add should_load_homepage http://website.com/

$ testmatic test show should_load_homepage

Should load homepage
====================

Doc: ./.testmatic/tests/should_load_homepage.md

Steps
-----
    STEP
1   Navigate to homepage
2   Observe homepage has loaded

Links
-----
NAME                  URL
http://website.com/   http://website.com/
```

```bash
$ testmatic tag link add guest_user http://test-accounts.com/guests

$ testmatic tag show guest_user

Guest user
==========

Doc: ./.testmatic/tags/guest_user.md

Links
-----
NAME                              URL
http://test-accounts.com/guests   http://test-accounts.com/guests

Tests
-----
TITLE                  NAME                   DOC
Should load homepage   should_load_homepage   ./.testmatic/tests/should_load_homepage.md
```

### Impacts

You might want to quickly find out, for a specific test or tag, which other tests or tags are related.

For example, some tests involving guest users might also involve other kinds of users or other systems, e.g. email notifications. So an error that causes failure of one test might cause failures of other related tests.

Testmatic has an Impacts feature which shows you a graph of impacts of a given test or tag. You can use the `test impacts` command to view a test's impacts or the `tag impacts` command for a tag's impacts.

```bash
$ testmatic test impact should_load_homepage

Test: Should load homepage - Impacts
====================================

--> Homepage screen (homepage_screen) [tag]
  --> Footer (footer) [tag]
    --> Should show copyright info (should_show_copyright_info) [test]
  --> Header (header) [tag]
    --> Should show log out button (should_show_log_out_button) [test]
--> Homepage url (homepage_url) [tag]
  --> Should indicate logged in status after log in (should_indicate_logged_in_status_after_log_in) [test]
    --> Header login link (header_login_link) [tag]
    --> Login form (login_form) [tag]
    --> Valid existing user login credentials (valid_existing_user_login_credentials) [tag]
    --> Header logged in status (header_logged_in_status) [tag]
```

```bash
$ testmatic tag impacts homepage_url

Tag: Homepage url - Impacts
===========================

--> Should indicate logged in status after log in (should_indicate_logged_in_status_after_log_in) [test]
--> Should load homepage (should_load_homepage) [test]
  --> Homepage screen (homepage_screen) [tag]
    --> Footer (footer) [tag]
      --> Should show copyright info (should_show_copyright_info) [test]
    --> Header (header) [tag]
      --> Should show log out button (should_show_log_out_button) [test]
```

## Notes

### Benefits of manual testing

There is much agreement that testing generally is useful, but what about manual testing?

Manual testing provides a rather unique combination of benefits:

- Manual tests give you way of discovering and documenting **intended behaviour** – how the system is expected to behave.
- Manual test cases can be written immediately, without any automated setup.
- Manual tests can be run in any environment you have access to.
- Manual tests allow you to experience the system as an end-user would, observing the whole experience.
- Manual tests allow you to verify complex, lengthy workflows or workflows involving multiple systems, without a complex automation framework.

This combination of benefits make manual testing highly useful for certain specific scenarios such as working on a large and complicated application in a highly time-constrained context, e.g. a fast-growing startup.

### Drawbacks of automated testing

Much of the industry has focussed on the benefits of automated testing and some have downplayed manual testing, claiming it to be time-consuming, inefficient and error-prone.

These criticisms may be strong in theory, but in practice they can ignore some important issues with automated testing:

- Automated test coverage can be limited.
- Automating all important flows can be time-consuming.
- Automating certain kinds of behaviour can be very difficult. E.g. full user interface testing including observing smoothness, performance, accessibility, etc. or long complex flows involving multiple systems, both internal and external to the organisation, can be very difficult to automate.
- Automating testing may limit incidental or unplanned but desirable discoveries. These would more likely be picked in manual testing. E.g. testing a login flow, one might discover a small UI glitch with the password entry field.

In most situations, the optimal choice is probably some combination of automated and manual testing.

Automated tests are useful and widely applicable, but not the "one ring to rule them all".

### Collaboration in manual testing

One might argue that test specialists, QA departments or third-parties should be responsible for testing. Engineers should focus on building the solution, designers on designing, etc.

While specialisation is good for productivity, a blinkered or siloed approach to testing is not necessarily optimal.

- More (and a variety of) eyes on a product are more likely to uncover errors.
- Errors (or important ones at least) eventually need to be fixed and this will likely involve engineers. It will likely be easier for engineers to fix errors if they already have a good grasp on key test cases and are generally capable testers themselves.
- Fixes may come in various forms, not necessarily engineering. E.g. a small error in pricing might be cheaper to fix by simply adjusting copy in an email to alert users, rather than consuming expensive engineer-hours.
- Engineers who understand test cases can gain a more holistic understanding of the system they are working on. Rather than just focussing on structure / code, engineers can think of how the software is being used and tailor their efforts accordingly. E.g. prioritisation of work, code structure, data structure selection, time estimates, long-term goal-setting.

### Benefits of using Testmatic

Manual testing can be achieved in various ways with various systems.

Some key benefits of using Testmatic for your manual tests are:

- Fast and easy to create and update via CLI or text editor
- Easy to share with business and tech people alike
- Organised, structured and repeatable, enabling rigor and consistency in the testing effort
- Searchable by tag, allowing second-order impacts of failures to be identified, tested and fixed
- Can be used to generate automated unit test code scaffolding if desired (see: [Roadmap](#roadmap))

#### Testing steps are simple and easy for people to read

Given/When/Then syntax is cumbersome and requires a learning curve and is generally the domain of software engineers.

In contrast, simple lists of testing steps, much like the method in a cooking recipe, are easy to understand for a broad set of team members – e.g. agile managers, product owners, QA, designers, engineers.

#### Testing steps support simple, fast and rigorous manual testing

It's easier and faster to manually test software when you are clear on what specific actions need to be taken and in what order.

By documenting and organising testing procedures, manual testing can be performed consistently, ensuring a rigorously tested product.

#### Testmatic tests can be incrementally automated

Testmatic focusses on helping you write and organise your testing steps first, generating empty placeholder functions without you having to immediately write code to automate them.

If and when you decide to add automation, it's easy to locate the places in which to write code, and you can automate step by step, rather than having to automate a whole test sequence all at once.

#### Testmatic tests are easy to share

You can share your test steps with team members and stakeholders easily.

You can link to a whole test, or a list of related tests.

#### Testmatic tests can be hosted in version control, with zero third-party dependencies or additional setup

This makes it easy to get started quickly - simply fork the testmatic project, begin generating and committing your tests, and push to your own repository.

If your organisation has a version control system, and you have permission to create a new repository, you already have everything you need to get started.

#### Testmatic tests are version-controlled and implemented in code

As your testmatic instance is a forked Git repository by default, you reap all the benefits of version control - tracking the history of changes, branching, ability to revert changes, etc.

As tests, steps and tags are stored internally as Typescript code, you can easily make modifications - large or small - using the standard tools of your IDE. For example, in VS Code, you can rename a token and automatically have it update all usages, by renaming the file with [Update imports on file move](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_update-imports-on-file-move) and [Rename symbol](https://code.visualstudio.com/docs/editor/refactoring#_rename-symbol).

#### Testmatic tags provide a powerful way to group related tests

For example, you can instantly retrieve a list of all tests for a particular screen, e.g. Login screen or Dashboard screen.

Or you can instantly retrieve a list of tests that utilise a particular test account.

These lists can be conveniently linked from external repositories of information, such as a Solution design in a Wiki, a task tracking system or company chat.

For example, a wiki page for the Login screen could link to a testmatic doc listing all tests for that screen: http://github.com/myaccount/mytests/blob/main/docs/tags/login_screen.md.

## CLI reference

<!-- insert cli-reference start -->

### init

Usage: init

Create a new project in the current working directory

### project create

Usage: project create

Create a new project in the current working directory (same as `testmatic init`)

### test list

Usage: test list [options]

List tests in the current project

Options:

<table>
<thead>
  <tr>
    <th>Syntax</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
          <td>
            -t,<br /> --tag <value><br />
          </td>
          <td>
            Filter by tag
          </td>
        </tr>
</tbody>
</table>

### test add

Usage: test add [options]

Add a new test to the project

Options:

<table>
<thead>
  <tr>
    <th>Syntax</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
          <td>
            -t,<br /> --title <value><br />
          </td>
          <td>
            Title of the test.
Also used to generate an underscored filename used to refer to the test in short-hand.
Titles must be unique.
Titles should briefly summarise the test steps.

Required - must be provided, either via prompt or command line.

</td>
</tr>

<tr>
          <td>
            -d,<br /> --description <value><br />
          </td>
          <td>
            Description of the test.
Longer than the title, provides a more detailed summary of the test.

Tests can also include tags, enclosed in round brackets: (, ).
For further information, see 'testmatic tag help'.

Optional.

</td>
</tr>

<tr>
          <td>
            -s,<br /> --steps [steps...]<br />
          </td>
          <td>
            List of steps of the test.

Add each step in quotes separated by a space, e.g.: "step one" "step two"
Steps will be in the order that they are provided.

Required - at least one step must be provided, either via prompt or command line.

</td>
</tr>

<tr>
          <td>
            -l,<br /> --links [links...]<br />
          </td>
          <td>
            List of links to associate with the test.
For example, a deep link to the web page being tested or relevant documentation.

Add each link href in quotes separated by a space.
E.g.: "http://product.com/login" "http://wiki.com/login-flow".

Links can be prefixed with text separated by a pipe "|".
E.g. "Login page|http://product.com/login" "Login flow docs|http://wiki.com/login-flow"

Optional.

</td>
</tr>

</tbody>
</table>

### test delete

Usage: test delete <testNameOrTitle>

Delete a test

### test show

Usage: test show <testNameOrTitle>

Show the full details of a test

### test link add

Usage: test link add [options] <testNameOrTitle> <linkHrefOrTitle>

Add a new link to a test

Options:

<table>
<thead>
  <tr>
    <th>Syntax</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
          <td>
            -t,<br /> --title <value><br />
          </td>
          <td>
            Title of the new link.

Optional.

</td>
</tr>

</tbody>
</table>

### test link delete

Usage: test link delete <testNameOrTitle> <linkHrefOrTitle>

Delete a link from a test

### test link open

Usage: test link open <testNameOrTitle> <linkHrefOrTitle>

Open a test link in the browser

### tag list

Usage: tag list

List tags in the current project

### tag add

Usage: tag add [options]

Add a new tag to the project

Options:

<table>
<thead>
  <tr>
    <th>Syntax</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
          <td>
            -t,<br /> --title <value><br />
          </td>
          <td>
            Title of the tag.
Also used to generate an underscored filename used to refer to the test in short-hand.
Titles must be unique.
Titles should briefly describe the tag.

Required - must be provided, either via prompt or command line.

</td>
</tr>

<tr>
          <td>
            -y,<br /> --type <value><br />
          </td>
          <td>
            Type of the tag.
Used to categorise one or more similar tags.
E.g. "page" for tags that refer to a page in an website.

Optional.

</td>
</tr>

<tr>
          <td>
            -d,<br /> --description <value><br />
          </td>
          <td>
            Description of the test.
Longer than the title, provides a more detailed description of the tag.

Optional.

</td>
</tr>

<tr>
          <td>
            -l,<br /> --links [links...]<br />
          </td>
          <td>
            List of links to attach to the tag.
For example, a deep link to the web page being tested or relevant documentation.

Add each link href in quotes separated by a space.
E.g.: "http://product.com/login" "http://wiki.com/login-flow".

Links can be prefixed with text separated by a pipe "|".
E.g. "Login page|http://product.com/login" "Login flow docs|http://wiki.com/login-flow"

Optional.

</td>
</tr>

</tbody>
</table>

### tag delete

Usage: tag delete <tagNameOrTitle>

Delete a tag

### tag show

Usage: tag show <tagNameOrTitle>

Show the full details of a tag

### tag link add

Usage: tag link add [options] <tagNameOrTitle> <tagLinkHref>

Add a new link to a tag

Options:

<table>
<thead>
  <tr>
    <th>Syntax</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
          <td>
            -t,<br /> --title <value><br />
          </td>
          <td>
            Title of the new link.

Optional.

</td>
</tr>

</tbody>
</table>

### tag link delete

Usage: tag link delete <tagNameOrTitle> <linkHrefOrTitle>

Delete a link from a tag

### tag link open

Usage: tag link open <tagNameOrTitle> <linkHrefOrTitle>

Open a tag link in the browser

### tag impacts

Usage: tag impacts <tagNameOrTitle>

List the tests and tags that are impacted by a tag

### run show

Usage: run show <testNameOrTitle> [runDateTime]

Show the full details of a run

### run open

Usage: run open <testNameOrTitle> [runDateTime]

Open a run folder

<!-- insert cli-reference end -->

## FAQ

### **_Can I add screenshots or screencasts from my testing?_**

Yes!

You can add them to a run folder of your test or link to them from the run markdown file.

See the [Runs](#runs) section under [Advanced](#advanced).

## Contributing

You can get started by **forking the testmatic repo**.

### What you'll need

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

### Fork Testmatic

1. On GitHub.com, navigate to the testmatic/testmatic repository.
2. In the top-right corner of the page, click Fork.
3. Under "Owner," select the dropdown menu and click an owner for the forked repository.
4. By default, forks are named the same as their upstream repositories. Optionally, to further distinguish your fork, in the "Repository name" field, type a name.
5. Optionally, in the "Description" field, type a description of your fork.
6. Optionally, select Copy the DEFAULT branch only.
7. For many forking scenarios, such as contributing to open-source projects, you only need to copy the default branch. If you do not select this option, all branches will be copied into the new fork.
8. Click Create fork.

You can then checkout to a local folder.

```bash
git clone https://github.com/myname/mytestmatic
```

And install the dependencies using npm.

```bash
npm install
```

Congratulations! You now have a working Testmatic project.

### Roadmap

<table>
  <tr>
    <th>Future</th>
    <td>More advanced querying, similarity search for tags, web-based UI, re-usability as a library, code generation framework.</td>
  </tr>
  <tr>
    <th>28-May-2024</th>
    <td>Simplification of core, leveraging of `commander` and `chalk` libraries, deferral of code generation, addition of runs and impacts feature.</td>
  </tr>
  <tr>
    <th>13-Aug-2023</th>
    <td>Initial release with core framework and basic support for tests, steps, tags, doc generation and querying of tests and steps.</td>
  </tr>
</table>

## Troubleshooting

Nothing to write here so far. This section will be updated if and as needed.

## Contact

Please feel free to contact Jonathan, the project maintainer.

- Twitter - @conwy
- Github - @jonathanconway
- Email - jon@conwy.co
