import { Flags } from "@oclif/core";
import { ArgInput } from "@oclif/core/lib/interfaces";
import chalk from "chalk";
import logSymbols from "log-symbols";
import ora from "ora";
import { Filelike, getFilesFromPath } from "web3.storage";
import AuthenticatedCommand from "../../lib/authenticated-command";

export default class Upload extends AuthenticatedCommand {
  static description = "Upload a file or directory to IPFS";

  static args?: ArgInput | undefined = [
    {
      name: "filePath",
      description: "Filepath of the file or directory to upload",
      required: true,
    },
  ];

  static flags = {
    name: Flags.string({
      char: "n",
      description:
        "Name you want to give to the upload (defaults to Upload at <date and time>)",
    }),
    dontWrapCID: Flags.boolean({
      char: "d",
      description:
        "Don't wrap the file/dir with the CID in IPFS (by default, it is wrapped, recommended to be used when uploading a directory)",
      default: false,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Upload);
    const { filePath } = args;
    const { name, dontWrapCID } = flags;
    const client = this.client;

    if (name) {
      console.log(logSymbols.info, "Uploading file(s) with name:", name);
    }

    if (dontWrapCID) {
      console.log(
        logSymbols.info,
        "Uploading file(s) without wrapping them with the CID"
      );
    }

    const spinner = ora("Uploading...").start();

    const files = await getFilesFromPath(filePath);

    try {
      const rootCID = await client.put(files as Iterable<Filelike>, {
        name,
        wrapWithDirectory: !dontWrapCID,
        maxRetries: 3,
      });

      spinner.succeed(`Uploaded files with CID: ${rootCID} 🚀`);
      this.log("Link:", chalk.blue(`https://dweb.link/ipfs/${rootCID}`));
    } catch (error) {
      spinner.fail("Failed to upload files to IPFS");
      console.log(chalk.red(error));
    }
  }
}
