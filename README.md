# testmatic

> ⚡️ Supercharge your testing ⚙️

Testmatic is a framework and command-line tool for quickly and easily writing and organising human-readable test cases.

Simple lists of **_steps_** are grouped into **_tests_**, which can be further organised by **_tags_**.

Everything is stored in Markdown files, for easy viewing, editing, searching and version control.

If pushed to a server, links to Markdown files can be shared via Wiki, Chat channel, email, etc.

## Intro

### Getting started

Get started by installing Testmatic via the CLI.

#### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  When installing Node.js, you are recommended to check all checkboxes related to dependencies.

#### Install Testmatic

Install globally via NPM:

```bash
npm install -g testmatic
```

#### Create a project

A Testmatic project consists of a `.testmatic` folder in your current working directory, containing sub-folders for `tests`, `tags` and `runs`.

You can generate the folders by this command:

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

(Note: We're using the test name `should_load_homepage` here. It's just the title condensed into one word using underlines: `_`. This makes it easier to copy/paste when needed.)

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
    - should_load_homepage.md
  - tags
    - guest_user.md
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

When you perform a test, you might want to record the fact that you performed it at that date and time. You might also want to attach relevant material such as text, links and video files of screen recordings or outputs such as JSON or CSV files.

Testmatic has a Runs feature to help you with this.

Each test can have one or more runs.

Each run has:

- **One dated Markdown file** containing the date/time, text and links (if any)
- **One dated folder** containing the above Markdown file and any other files you wish to include (screen recordings, outputs, etc.)

To create a run, simply run the `run add` command, providing the test name (or title) as the first parameter:

```bash
testmatic run add should_load_homepage
```

(Note: You can optionally provide a date-time stamp in the format: `YYYY-MM-DD_HH-MM`. For example: `2024-10-01_11:30` for October 1, 2024 at 11:30 AM.)

The new run folder and Markdown file should now have been created.

You can verify this using the `run show` command:

```bash
testmatic run show should_load_homepage

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
      - 2024-04-24_02-44
        - 2024-04-24_02-44.md

You can open that folder in Finder (on Mac) using the `run open` command:

```bash
testmatic run open should_load_homepage
```

Note: How does Testmatic know which run to show / open? It uses the latest by default. But if you prefer to target an older run, can provide an additional argument of the date/time stamp of the run to the `run show` or `run open` command.

### Links

You can add/remove links manually by editing the test, tag or run Markdown files.

But Testmatic includes `link` commands for quickly adding tags without leaving the command line.

```bash
testmatic test link add should_load_homepage http://website.com/
```

```bash
testmatic tag link add guest_user http://test-accounts.com/guests
```

### Impacts

Any test or tag might be related to other tests.

For example, some tests involving guest users might also involve other kinds of users or other systems, e.g. email notifications.

Testmatic has an Impacts feature to show you the graph of impacts of a test or tag.

You can use the `test impacts` or `tag impacts` command to view the impact graph for a specific test or tag.

```bash
testmatic test impacts should_load_homepage
```

```bash
testmatic tag impacts guest_user
```

## Background

### Benefits of testing in general

Research indicates that thorough testing is critical to success in software projects. According to one study, software failures in the US alone cost the economy USD 1.1 trillion in assets in 2016 and impacted 4.4 billion customers. <sup>1</sup>

---

<sup>1</sup> [https://www.cloudcomputing-news.net/news/2017/oct/30/glitch-economy-counting-cost-software-failures/](https://www.cloudcomputing-news.net/news/2017/oct/30/glitch-economy-counting-cost-software-failures/)

### Benefits of manual testing

### Benefits of functional testing

### Benefits of using testmatic for your test cases

Some key benefits of testmatic:

1. Testing steps are simple and easy for people to read
2. Testing steps support simple, fast and rigorous manual testing
3. Testmatic tests can be incrementally automated
4. Testmatic tests are easy to link to
5. Testmatic tests can be hosted in version control, with zero third-party dependencies or additional setup
6. Testmatic tests are version-controlled
7. Testmatic tags provide a powerful way to group related tests

#### 1. Testing steps are simple and easy for people to read

Given/When/Then syntax is cumbersome and requires a learning curve and is generally the domain of software engineers.

In contrast, simple lists of testing steps, much like the method in a cooking recipe, are easy to understand for a broad set of people.

#### 2. Testing steps support simple, fast and rigorous manual testing

It's easier and faster to manually test software when you are clear on what specific actions need to be taken and in what order.

By documenting and organising testing procedures, manual testing can be performed consistently, ensuring a rigorously tested product.

#### 3. Testmatic tests can be incrementally automated

Testmatic focusses on helping you write and organise your testing steps first, generating empty placeholder functions without you having to immediately write code to automate them.

If and when you decide to add automation, it's easy to locate the places in which to write code, and you can automate step by step, rather than having to automate a whole test sequence all at once.

#### 4. Testmatic tests are easy to link to

You can share your test steps with team members and stakeholders easily.

You can link to a whole test, or a list of related tests.

#### 5. Testmatic tests can be hosted in version control, with zero third-party dependencies or additional setup

This makes it easy to get started quickly - simply fork the testmatic project, begin generating and committing your tests, and push to your own repository.

If your organisation has a version control system, and you have permission to create a new repository, you already have everything you need to get started.

#### 6. Testmatic tests are version-controlled and implemented in code

As your testmatic instance is a forked Git repository by default, you reap all the benefits of version control - tracking the history of changes, branching, ability to revert changes, etc.

As tests, steps and tags are stored internally as Typescript code, you can easily make modifications - large or small - using the standard tools of your IDE. For example, in VS Code, you can rename a token and automatically have it update all usages, by renaming the file with [Update imports on file move](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_update-imports-on-file-move) and [Rename symbol](https://code.visualstudio.com/docs/editor/refactoring#_rename-symbol).

#### 7. Testmatic tags provide a powerful way to group related tests

For example, you can instantly retrieve a list of all tests for a particular screen, e.g. Login screen or Dashboard screen.

Or you can instantly retrieve a list of tests that utilise a particular test account.

These lists can be conveniently linked from external repositories of information, such as a Solution design in a Wiki, a task tracking system or company chat.

For example, a wiki page for the Login screen could link to a testmatic doc listing all tests for that screen: http://github.com/myaccount/mytests/blob/main/docs/tags/login_screen.md.

## Contributing

You can get started by **forking the testmatic repo**.

### What you'll need

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Fork Testmatic

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

## CLI reference

### `project init`

### `test list`

#### `--tag`

### `test add`

### `test remove`

### `test show`

### `test link add`

### `test link delete`

### `test link open`

### `tag list`

### `tag add`

### `tag remove`

### `tag show`

### `tag link add`

### `tag link delete`

### `tag link open`

## FAQ

### **_How does testmatic test execution work under-the-hood?_**

testmatic is built as a layer on top of Jest. So all testmatic test runners are really Jest tests and testmatic step runners are functions called by those tests.

As testmatic tests are build on top of Jest, you can use all the regular Jest facilities, such as `beforeAll`, `beforeEach`, `expect`, etc.

### **_Does testmatic support web automation testing?_**

Yes!

You can import whatever libraries you need (e.g. `phantomjs`, `playwright`) into your step files and write code in the step runners to open a browser, manipulate DOM elements and assert on results.

### **_Does testmatic support web API testing?_**

Yes!

You can import whatever libraries you need (e.g. `fetch`, `axios`) into your step files and write code in the step runners to make calls and assert on results.

### **_Can I add screenshots or screencasts from my testing?_**

Yes!

You can add them to a run folder of your test or link to them from the run markdown file.

See the [Runs](#runs) section under [Advanced](#advanced).

## Roadmap

<table>
  <tr>
    <th>Future</th>
    <td>Screenshot and screencast links, more advanced querying, static site generator, dependency graphs, import as a library.</td>
  </tr>
  <tr>
    <th>13-Aug-2023</th>
    <td>Initial release with core framework and basic support for tests, steps, tags, doc generation and querying of tests and steps.</td>
  </tr>
</table>

## Troubleshooting and Support

Please contact Jon.

- Twitter - @conwy
- Github - @jonathanconway
- Email - jon@conwy.co
