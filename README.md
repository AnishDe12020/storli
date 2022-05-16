oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g storli
$ storli COMMAND
running command...
$ storli (--version)
storli/0.0.0 linux-x64 node-v16.14.2
$ storli --help [COMMAND]
USAGE
  $ storli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`storli hello PERSON`](#storli-hello-person)
* [`storli hello world`](#storli-hello-world)
* [`storli help [COMMAND]`](#storli-help-command)
* [`storli plugins`](#storli-plugins)
* [`storli plugins:install PLUGIN...`](#storli-pluginsinstall-plugin)
* [`storli plugins:inspect PLUGIN...`](#storli-pluginsinspect-plugin)
* [`storli plugins:install PLUGIN...`](#storli-pluginsinstall-plugin-1)
* [`storli plugins:link PLUGIN`](#storli-pluginslink-plugin)
* [`storli plugins:uninstall PLUGIN...`](#storli-pluginsuninstall-plugin)
* [`storli plugins:uninstall PLUGIN...`](#storli-pluginsuninstall-plugin-1)
* [`storli plugins:uninstall PLUGIN...`](#storli-pluginsuninstall-plugin-2)
* [`storli plugins update`](#storli-plugins-update)

## `storli hello PERSON`

Say hello

```
USAGE
  $ storli hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/AnishDe12020/storli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `storli hello world`

Say hello world

```
USAGE
  $ storli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `storli help [COMMAND]`

Display help for storli.

```
USAGE
  $ storli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for storli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `storli plugins`

List installed plugins.

```
USAGE
  $ storli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ storli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `storli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ storli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ storli plugins add

EXAMPLES
  $ storli plugins:install myplugin 

  $ storli plugins:install https://github.com/someuser/someplugin

  $ storli plugins:install someuser/someplugin
```

## `storli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ storli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ storli plugins:inspect myplugin
```

## `storli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ storli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ storli plugins add

EXAMPLES
  $ storli plugins:install myplugin 

  $ storli plugins:install https://github.com/someuser/someplugin

  $ storli plugins:install someuser/someplugin
```

## `storli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ storli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ storli plugins:link myplugin
```

## `storli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ storli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ storli plugins unlink
  $ storli plugins remove
```

## `storli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ storli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ storli plugins unlink
  $ storli plugins remove
```

## `storli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ storli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ storli plugins unlink
  $ storli plugins remove
```

## `storli plugins update`

Update installed plugins.

```
USAGE
  $ storli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
