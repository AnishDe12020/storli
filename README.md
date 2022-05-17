# Storli

A CLI to upload files to IPFS and interact with them using
[wbe3.storage](https://web3.storage)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/storli.svg)](https://npmjs.org/package/oclif-hello-world)
[![Downloads/week](https://img.shields.io/npm/dw/storli.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/storli.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->

- [Storli](#storli)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g storli
$ storli COMMAND
running command...
$ storli (--version)
storli/1.0.0 linux-x64 node-v16.14.2
$ storli --help [COMMAND]
USAGE
  $ storli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`storli config`](#storli-config)
- [`storli download CID`](#storli-download-cid)
- [`storli help [COMMAND]`](#storli-help-command)
- [`storli list`](#storli-list)
- [`storli ls`](#storli-ls)
- [`storli status CID`](#storli-status-cid)
- [`storli upload FILEPATH`](#storli-upload-filepath)

## `storli config`

Configure the CLI

```
USAGE
  $ storli config

DESCRIPTION
  Configure the CLI
```

_See code: [dist/commands/config/index.ts](https://github.com/AnishDe12020/storli/blob/v1.0.0/dist/commands/config/index.ts)_

## `storli download CID`

Download files from an upload

```
USAGE
  $ storli download [CID]

ARGUMENTS
  CID  The CID of the upload

DESCRIPTION
  Download files from an upload
```

_See code: [dist/commands/download/index.ts](https://github.com/AnishDe12020/storli/blob/v1.0.0/dist/commands/download/index.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `storli list`

List all uploads made by you

```
USAGE
  $ storli list

DESCRIPTION
  List all uploads made by you

ALIASES
  $ storli ls
```

_See code: [dist/commands/list/index.ts](https://github.com/AnishDe12020/storli/blob/v1.0.0/dist/commands/list/index.ts)_

## `storli ls`

List all uploads made by you

```
USAGE
  $ storli ls

DESCRIPTION
  List all uploads made by you

ALIASES
  $ storli ls
```

## `storli status CID`

Check the status of an upload

```
USAGE
  $ storli status [CID]

ARGUMENTS
  CID  The CID of the upload to check the status of

DESCRIPTION
  Check the status of an upload
```

_See code: [dist/commands/status/index.ts](https://github.com/AnishDe12020/storli/blob/v1.0.0/dist/commands/status/index.ts)_

## `storli upload FILEPATH`

Upload a file or directory to IPFS

```
USAGE
  $ storli upload [FILEPATH] [-n <value>] [-d]

ARGUMENTS
  FILEPATH  Filepath of the file or directory to upload

FLAGS
  -d, --dontWrapCID   Don't wrap the file/dir with the CID in IPFS (by default, it is wrapped, recommended to be used
                      when uploading a directory)
  -n, --name=<value>  Name you want to give to the upload (defaults to Upload at <date and time>)

DESCRIPTION
  Upload a file or directory to IPFS
```

_See code: [dist/commands/upload/index.ts](https://github.com/AnishDe12020/storli/blob/v1.0.0/dist/commands/upload/index.ts)_

<!-- commandsstop -->
