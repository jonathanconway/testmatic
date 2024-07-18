# testmatic

> ⚡️ Supercharge your test cases ⚙️

Testmatic is a test-case manager for quickly writing and organising human-readable test cases.

- ✅ simple lists of [**_steps_**](#tests-and-steps)
- 🧪 are grouped into [**_tests_**](#tests-and-steps)
- 🏷️ which can be organised by [**_tags_**](#tags)
- 🏃 with results tracked in [**_runs_**](#runs)

<table>
  <tr>
    <td>
      <img src="./docs/ui-demo.gif">
    </td>
    <td>
      <img src="./docs/cli-demo.gif">
    </td>
  </tr>
</table>

Everything is stored in Markdown files, for easy viewing, editing, searching and version control. If pushed to a server, links to Markdown files can be shared within your org, via e.g. Wiki pages, Chat posts, email, etc.

The main benefit of using Testmatic is that it helps you to perform [manual testing](#benefits-of-manual-testing) in an organised, consistent, rigorous, systematic manner.

Manual testing can offer fast benefits when automated test coverage is limited, development time is constrained and rapid delivery is required while minimising defects.

Whenever you are ready to add automation, Testmatic can help you there too: code generators automatically convert your test cases into unit test files.

## Contents

- [Concepts](#concepts)
- [Getting started](#getting-started)
- [UI](#ui)
- [CLI](#cli)
- [Advanced](#advanced)
- [Background](#background)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)

<!-- ------------------------------------------------------------------------------------------------- -->

## Concepts

### Tests and steps

At the heart of Testmatic is **tests** which are simple numbered lists of **steps**.

You simply follow the the steps to test the system.

Here's an example of a test:

![Sign in \n 1. Go to the website \n 2. Click the sign in button \n 3. Enter the username and password of a registered user \n 4. Click the submit button \n 5. Observe that you are signed in](/docs/concepts/tests_and_steps/test_example.svg)

<!--
**Sign in**

1. Go to the website
2. Click the sign in button
3. Enter the username and password of a registered user
4. Click the submit button
5. Observe that you are signed in
-->

You'll notice some steps are actions, such as:

> 2. Click the sign in button

Whereas others are expectations, such as:

> 5. Observe that you are signed in

The **actions** tell us what to do but the **expectations** tell us how the system should behave or respond.

If the system does not behave as expected then either there is a fault in the system or our expectation is wrong.

The title and steps should be as short and succinct as possible but also clear and specific enough to easily follow and understand.

### Tags

As you write many tests, you'll no doubt notice common recurring elements.

These elements can be referenced by **tags**, which are re-usable tokens that can be used to group and organise tests.

Tags are indicated in steps by surrounding a piece of text with round brackets like this: `(tag)`.

For example, the "sign in" button might be a recurring element. Here's how it would look if we make it tag:

![Reset password \n 1. Go to the website \n 2. Click the (sign in button) \n 3. Enter the username and incorrect password of a registered user \n 4. Click the submit button \n 5. Observe that an error appears indicating the incorrect password \n 6. Observe that a forgotten password link appears \n 7. Click the forgotten password link \n 8. Open your email, copy the code \n 9. Switch back to the website, paste in the code \n 10. Enter a new password and click submit \n 11. Click the (sign in button) again \n 12. Enter the username and new password \n 13. Observe that you are signed in](/docs/concepts/tags/tags_example.svg)

<!--
**Reset password**

1. Go to the website
2. Click the (sign in button)
3. Enter the username and incorrect password of a registered user
4. Click the submit button
5. Observe that an error appears indicating the incorrect password
6. Observe that a forgotten password link appears
7. Click the forgotten password link
8. Open your email, copy the code
9. Switch back to the website, paste in the code
10. Enter a new password and click submit
11. Click the (sign in button) again
12. Enter the username and new password
13. Observe that you are signed in
-->

Tags can be the following:

- Visual elements in the UI
- Pages of a website
- Screens of an app
- Test user accounts
- Flows, e.g. sign in flow
- Anything else that might be common between different tests

Note: You can also attach tags to a test itself. This is useful when you want a tag to apply to a whole test, not just one or more steps.

### Runs

After you have written a test you might follow the steps of that test any number of times, to ensure the system is behaving correctly.

What if you want to keep track of the results? This is what **test runs** are for.

Each test can have multiple runs. Each run has a date/time stamp indicating when it was performed as well as a result and a list of checked/unchecked test steps.

You can mark each run with a **result**:

- _Passed_ - the system behaved correctly
- _Failed_ - there was some problem so the whole test failed
- _Mixed_ - some steps passed, some failed
- _Unset_ - you haven't performed the test yet

You can also check off individual test steps as you go through the run. This could be useful when making a screen recording, to show which steps have been executed, or just to keep track of the steps.

Each run has a date/time stamped folder containing the run file.

You can put screenshots or screen recording files into this folder as well. That way they will be easier to locate if/when you need them.

Runs are a powerful feature for measuring and organising your test results. You can quickly see which tests have passed or failed and keep your screen recordings organised.

### Impacts

Part of the benefit of tags (discussed earlier) is their usefulness for grouping and locating tests. If two or more tests reference the same tag then you can locate these tests by filtering by that tag.

This gives you a way of finding **impacts** – which tests might be impacted by a particular tag.

For example, suppose you are making a visual change to the website header, which might impact the sign up button. You can search for all tests that reference the `(sign up button)` tag.

Your search might turn up a list of tests like this:

- Sign in as user
- Sign in as admin
- Reset password
- Sign out

Now you can run some or all of these tests and check how the Sign up button behaves under various scenarios. If you change introduced a bug in one of the tests, you'll have a chance to find the bug and fix it early rather than waiting for it to crop up in production.

<!-- ------------------------------------------------------------------------------------------------- -->

## Getting started

### Installing the CLI

Get started by installing Testmatic via the CLI.

#### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above.

#### Install Testmatic

Install globally via NPM:

```bash
npm install -g testmatic
```

You can verify the installation by running:

```bash
testmatic
```

### Installing the local UI

Get started by installing Testmatic via the UI.

#### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above.

#### Install Testmatic local UI

Install globally via NPM:

```bash
npm install -g testmatic-ui
```

#### Run the Testmatic local UI

You can start the UI from your command line.

```bash
testmatic-ui
```

You will want to first switch to the directory where you want to locate your Testmatic project.

For example, if you want to put your Testmatic project under `~/Sources/my-app`, run this:

```bash
cd ~/Sources/my-app
testmatic-ui
```

This will set up your Testmatic project in the following folder: `~/Sources/my-app/.testmatic`.

### Using the hosted UI

If you just want to play around with Testmatic or use it lightly, you can immediately get started with the hosted UI.

The hosted UI can be used immediately, without any local installation.

Simply navigate to: http://testmatic.surge.sh and begin adding your tests.

You can find instructions for using the hosted UI at [UI guide](#ui-guide).

<!-- ------------------------------------------------------------------------------------------------- -->

## UI guide

### Starting a project in the UI

There is no need to explicitly create a new project in the UI. As soon as you open the UI, a new test project will be created if one does not already exist.

#### Switching to a different project in the local UI

If you are running the Testmatic local UI, you can switch to a project in a different folder.

Simply exit the running Testmatic local UI instance (Ctrl+C or Cmd+C), use `cd` to switch to a different folder, then re-run `testmatic-ui`.

For example:

```bash
~/Sources/project-one $ testmatic-ui

Running Testmatic UI...
...

{ Cmd+C }

~/Sources/project-one $ cd ../project-two

~/Sources/project-two $ testmatic-ui

Running Testmatic UI...
...
```

### Creating a test in the UI

To create a new test, click the Add button in the Project explorer (top-left of the screen).

![Screenshot of the Testmatic UI with an empty project and clicking the Add button](/docs/ui_guide/creating_a_test_in_the_ui/click_add.png)

You can then enter a title and steps.

![Screenshot of the Testmatic UI entering text into the title field](/docs/ui_guide/creating_a_test_in_the_ui/enter_title.png)

![Screenshot of the Testmatic UI entering text into the steps fields](/docs/ui_guide/creating_a_test_in_the_ui/enter_steps.png)

When you're ready to save your new test, click Create (top-right of the screen).

![Screenshot of the Testmatic UI clicking create on a new test](/docs/ui_guide/creating_a_test_in_the_ui/click_create.png)

It will now appear in the Project explorer.

![Screenshot of the Testmatic UI showing createed test in Project explorer](/docs/ui_guide/creating_a_test_in_the_ui/view_created_test_in_project_explorer.png)

### Adding tags in the UI

> ℹ️ **Tags** are re-usable tokens that can be used to group and organise tests.
>
> For more info, see [tags](#tags).

You can add tags to steps or to the test as a whole.

#### Adding tags to steps

Focus on the step textbox and type in an "open backet" - `(`. Enter your tag name. Then type in "close bracket" - `)`.

You'll notice that a suggestion box appears – feel free to use this to quickly insert pre-existing tags.

- Keyboard - You can navigate with arrow keys and select a tag with the enter/return or tab key.
- Mouse - You can scroll up/down and click one of the tags in the list

### Finding tests by tag in the UI

### Advanced UI usage

#### Using Runs in the CLI

#### Using Links in the CLI

#### Using Impacts in the CLI

<!-- ------------------------------------------------------------------------------------------------- -->

## CLI guide

### Starting a project in the CLI

A Testmatic project consists of a `.testmatic` folder in your current working directory, containing sub-folders for `tests`, `tags` and `runs`.

You can generate the folders using the `init` command:

```bash
testmatic init
```

### Creating a test in the CLI

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

#### Adding tags in the CLI

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

#### Finding tests by tag in the CLI

Suppose you added a few other tests involving various kinds of users. But now you want to filter by only tests involving a guest user. You can filter the list of tests by the "Guest user" tag using `test list` command with the `--tag` switch.

```bash
testmatic test list --tag "Guest user"

TITLE                  NAME                   DOC
Should load homepage   should_load_homepage   ./.testmatic/tests/should_load_homepage.md
```

### Advanced CLI usage

#### Using Runs in the CLI

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

#### Using Links in the CLI

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

#### Using Impacts in the CLI

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

### Reference

<!-- insert cli-reference start -->

#### init

Usage: `init`

Create a new project in the current working directory

#### project create

Usage: `project create`

Create a new project in the current working directory (same as `testmatic init`)

#### test list

Usage: `test list [options]`

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
<code>-t</code>,<br /><code> --tag &lt;value&gt;</code>
</td>
<td>
Filter by tag
</td>
</tr>
</tbody>
</table>

#### test add

Usage: `test add [options]`

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
<code>-t</code>,<br /><code> --title &lt;value&gt;</code>
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
<code>-d</code>,<br /><code> --description &lt;value&gt;</code>
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
<code>-s</code>,<br /><code> --steps [steps...]</code>
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
<code>-l</code>,<br /><code> --links [links...]</code>
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

#### test delete

Usage: `test delete <testNameOrTitle>`

Delete a test

#### test show

Usage: `test show <testNameOrTitle>`

Show the full details of a test

#### test link add

Usage: `test link add [options] <testNameOrTitle> <linkHrefOrTitle>`

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
<code>-t</code>,<br /><code> --title &lt;value&gt;</code>
</td>
<td>
Title of the new link.

Optional.

</td>
</tr>
</tbody>
</table>

#### test link delete

Usage: `test link delete <testNameOrTitle> <linkHrefOrTitle>`

Delete a link from a test

#### test link open

Usage: `test link open <testNameOrTitle> <linkHrefOrTitle>`

Open a test link in the browser

#### tag list

Usage: `tag list`

List tags in the current project

#### tag add

Usage: `tag add [options]`

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
<code>-t</code>,<br /><code> --title &lt;value&gt;</code>
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
<code>-y</code>,<br /><code> --type &lt;value&gt;</code>
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
<code>-d</code>,<br /><code> --description &lt;value&gt;</code>
</td>
<td>
Description of the test.
Longer than the title, provides a more detailed description of the tag.

Optional.

</td>
</tr>
<tr>
<td>
<code>-l</code>,<br /><code> --links [links...]</code>
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

#### tag delete

Usage: `tag delete <tagNameOrTitle>`

Delete a tag

#### tag show

Usage: `tag show <tagNameOrTitle>`

Show the full details of a tag

#### tag link add

Usage: `tag link add [options] <tagNameOrTitle> <tagLinkHref>`

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
<code>-t</code>,<br /><code> --title &lt;value&gt;</code>
</td>
<td>
Title of the new link.

Optional.

</td>
</tr>
</tbody>
</table>

#### tag link delete

Usage: `tag link delete <tagNameOrTitle> <linkHrefOrTitle>`

Delete a link from a tag

#### tag link open

Usage: `tag link open <tagNameOrTitle> <linkHrefOrTitle>`

Open a tag link in the browser

#### tag type

Usage: `tag type <tagNameOrTitle> <tagType>`

Set the type of a tag

#### tag impacts

Usage: `tag impacts <tagNameOrTitle>`

List the tests and tags that are impacted by a tag

#### run show

Usage: `run show <testNameOrTitle> [runDateTime]`

Show the full details of a run

#### run open

Usage: `run open <testNameOrTitle> [runDateTime]`

Open a run folder

<!-- insert cli-reference end -->

## Topics

### What is manual testing?

Manual testing is using an application yourself to ensure it works well.

It can be as simple as opening the app or website and clicking around to check that everything works.

In more complicated cases, it can involve systematic, rigorous testing, such as going through the entire sign-up flow to ensure that it works correctly.

### Who does manual testing?

Simple manual testing, such as clicking around, is often done by developers/engineers as the build the product.

More advanced testing is often outsourced to QA departments, who use sophisticated test case tools.

However, as products become more complex, an increasing burden of testing falls on developers/engineers and others on the team.

Testmatic fills this middle-ground between casual/informal testing and professional QA.

### Benefits of manual testing

There is much agreement that **unit testing** is beneficial, but what about manual testing?

Manual testing provides unique benefits:

- Manual testing helps you discover and document **intended behaviour** – how the system is **expected** to behave.
- Manual test cases can be written **immediately**, without setting up test frameworks, etc.
- Manual testing can be done in **any environment** you have access to.
- Manual testing **puts you in the end-user's shoes**, letting you experience the system as an end-user would.
- Manual testing lets you **verify complex, lengthy workflows**, which might be too difficult to automate.

### Situations where manual testing is useful

The benefits make manual testing are highly useful in certain kinds of situations, such as:

- Large and complicated applications
- Poorly documented applications
- Time-constrained businesses, e.g. a fast-growing startup
- Cost-constrained businesses who cannot afford QA

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

Traditionally, manual testing was mainly performed by QA engineers, using sophisticated test case tools.

However, as products become more complex, an increasing burden of testing falls on developers/engineers and others on the team.

- Engineers perform manual testing to understand what they're building, why they're building it, how people will use it, etc.
- Engineers perform manual testing to ensure their code actually works as expected
- Product owners perform manual testing to understand how people use the product, identify issues and bottlenecks and ideate on future directions for the product
- Designers perform manual testing to see how the system looks and feels and identify areas for improvement, such as making the experience more consistent and cohesive

### Benefits of everyone doing a little testing

While specialisation is good for productivity, a blinkered or siloed approach to **testing** may not be optimal.

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

### FAQ

#### Can I add screenshots or screencasts from my testing?

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
