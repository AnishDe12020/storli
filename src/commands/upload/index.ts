import { Flags } from "@oclif/core";
import { ArgInput } from "@oclif/core/lib/interfaces";
import chalk from "chalk";
import logSymbols from "log-symbols";
import ora from "ora";
import { Filelike, getFilesFromPath } from "web3.storage";
import AuthenticatedCommand from "../../lib/authenticated-command";

export default class Upload extends AuthenticatedCommand {
  static description = "Upload a file to IPFS";

  static args?: ArgInput | undefined = [
    {
      name: "filePath",
      description: "Filepath of the file to upload (can also be a directory)",
      required: true,
    },
  ];

  static flags = {
    name: Flags.string({
      char: "n",
      description:
        "Name you want to give to the upload (this is just for the purpose of seeing the upload in web3.storage, it is not stored alongside the data in IPFS)",
    }),
    dontWrapCID: Flags.boolean({
      char: "d",
      description:
        "Don't wrap the file/dir with the CID in IPFS (by default, it is wrapped)",
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
        "Uploading file(s) without wrapping then with the CID"
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

      spinner.succeed(`Uploaded files with CID: ${rootCID}`);
    } catch (error) {
      spinner.fail("Failed to upload files to IPFS :(");
      console.log(chalk.red(error));
    }
  }
}
