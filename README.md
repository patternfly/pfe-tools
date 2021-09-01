@patternfly/pfe-tools
=====================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@patternfly/pfe-tools.svg)](https://npmjs.org/package/@patternfly/pfe-tools)
[![CircleCI](https://circleci.com/gh/kylebuch8/pfe-tools/tree/master.svg?style=shield)](https://circleci.com/gh/kylebuch8/pfe-tools/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@patternfly/pfe-tools.svg)](https://npmjs.org/package/@patternfly/pfe-tools)
[![License](https://img.shields.io/npm/l/@patternfly/pfe-tools.svg)](https://github.com/kylebuch8/pfe-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @patternfly/pfe-tools
$ pfe-tools COMMAND
running command...
$ pfe-tools (-v|--version|version)
@patternfly/pfe-tools/0.0.0 darwin-x64 node-v14.15.4
$ pfe-tools --help [COMMAND]
USAGE
  $ pfe-tools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pfe-tools build [FILE]`](#pfe-tools-build-file)
* [`pfe-tools dev [FILE]`](#pfe-tools-dev-file)
* [`pfe-tools hello [FILE]`](#pfe-tools-hello-file)
* [`pfe-tools help [COMMAND]`](#pfe-tools-help-command)
* [`pfe-tools new`](#pfe-tools-new)
* [`pfe-tools test-watch [FILE]`](#pfe-tools-test-watch-file)

## `pfe-tools build [FILE]`

Build all of the elements

```
USAGE
  $ pfe-tools build [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/build.ts](https://github.com/kylebuch8/pfe-tools/blob/v0.0.0/src/commands/build.ts)_

## `pfe-tools dev [FILE]`

Dev runs the build script with a watcher

```
USAGE
  $ pfe-tools dev [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/dev.ts](https://github.com/kylebuch8/pfe-tools/blob/v0.0.0/src/commands/dev.ts)_

## `pfe-tools hello [FILE]`

describe the command here

```
USAGE
  $ pfe-tools hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ pfe-tools hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/kylebuch8/pfe-tools/blob/v0.0.0/src/commands/hello.ts)_

## `pfe-tools help [COMMAND]`

display help for pfe-tools

```
USAGE
  $ pfe-tools help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `pfe-tools new`

Create a new web component

```
USAGE
  $ pfe-tools new

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/new.ts](https://github.com/kylebuch8/pfe-tools/blob/v0.0.0/src/commands/new.ts)_

## `pfe-tools test-watch [FILE]`

describe the command here

```
USAGE
  $ pfe-tools test-watch [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/test-watch.ts](https://github.com/kylebuch8/pfe-tools/blob/v0.0.0/src/commands/test-watch.ts)_
<!-- commandsstop -->
